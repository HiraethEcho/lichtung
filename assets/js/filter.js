import * as params from "@params";

const I18N = {
  loading: params.loading,
  noResults: params.noResults,
  error: params.error,
  match: params.matchLabel,
  and: params.andWord,
  or: params.orWord,
};

// Match any selected term within a taxonomy, and all selected taxonomies.
// No selection shows no results; the term links remain independently usable.
const toggles = Array.from(document.querySelectorAll(".ft-toggle"));
const groups = Array.from(document.querySelectorAll(".ft-group"));
const container = document.getElementById("filter-results");
const header = document.querySelector(".ft-results-header");
const expr = document.getElementById("filter-expr");
const clearBtn = document.getElementById("clear-filters");

const labels = Object.create(null);
groups.forEach((g) => (labels[g.dataset.tax] = g.dataset.label));

const selected = new Map(); // tax -> Set(term)
let articles = [];
let loadState = "loading";

// State lives in aria-pressed; CSS draws the box + check.
// .ft-none marker on the parent .ft-item = selecting it would yield 0 results.
function paint(el, on) {
  el.setAttribute("aria-pressed", on ? "true" : "false");
}

function chipEl(tax, term) {
  return toggles.find((c) => c.dataset.tax === tax && c.dataset.term === term);
}

function setSelected(tax, term, on) {
  const el = chipEl(tax, term);
  if (!el) return;
  const set = selected.get(tax) || new Set();
  if (on) set.add(term);
  else set.delete(term);
  if (set.size) selected.set(tax, set);
  else selected.delete(tax);
  paint(el, on);
}

function writeQuery() {
  const p = new URLSearchParams(location.search);
  groups.forEach((g) => p.delete(g.dataset.tax));
  selected.forEach((set, tax) => set.forEach((t) => p.append(tax, t)));
  const q = p.toString();
  history.replaceState(
    null,
    "",
    location.pathname + (q ? "?" + q : "") + location.hash,
  );
}

// A candidate chip is “dead” (would yield 0 results) if adding it to its
// taxonomy set matches nothing under the current cross-taxonomy AND.
function wouldBeEmpty(tax, term) {
  const orTerms = new Set(selected.get(tax) || []);
  orTerms.add(term);
  return !articles.some((a) => {
    const atTax = (a.taxonomies && a.taxonomies[tax]) || [];
    if (![...orTerms].some((x) => atTax.includes(x))) return false;
    for (const [t, terms] of selected) {
      if (t === tax) continue;
      const at = (a.taxonomies && a.taxonomies[t]) || [];
      if (![...terms].some((x) => at.includes(x))) return false;
    }
    return true;
  });
}

function markDeadChips() {
  toggles.forEach((c) => {
    const item = c.parentElement;
    if (!item) return;
    if (c.getAttribute("aria-pressed") === "true") {
      item.classList.remove("ft-none");
      return;
    }
    item.classList.toggle(
      "ft-none",
      loadState === "ready" && wouldBeEmpty(c.dataset.tax, c.dataset.term),
    );
  });
}

function renderExpr() {
  expr.replaceChildren();
  expr.hidden = !selected.size;
  if (!selected.size) return;
  expr.append(I18N.match + " ");
  let firstGroup = true;
  for (const [tax, terms] of selected) {
    if (!firstGroup) expr.append(" " + I18N.and + " ");
    firstGroup = false;
    expr.append("(" + (labels[tax] || tax) + ": ");
    let firstTerm = true;
    for (const term of terms) {
      if (!firstTerm) expr.append(" " + I18N.or + " ");
      firstTerm = false;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ft-token";
      button.dataset.tax = tax;
      button.dataset.term = term;
      button.textContent = term + " ×";
      expr.append(button);
    }
    expr.append(")");
  }
}

function matches(article) {
  for (const [tax, terms] of selected) {
    const at = (article.taxonomies && article.taxonomies[tax]) || [];
    if (!Array.from(terms).some((t) => at.includes(t))) return false;
  }
  return true;
}

function renderResults() {
  container.replaceChildren();
  header.hidden = !selected.size;
  if (!selected.size) return;
  const list = articles.filter(matches);
  if (loadState !== "ready" || !list.length) {
    const message = document.createElement("li");
    message.className = "post-item";
    message.textContent =
      loadState === "loading"
        ? I18N.loading
        : loadState === "error"
          ? I18N.error
          : I18N.noResults;
    container.append(message);
    return;
  }
  for (const article of list) {
    const item = document.createElement("li");
    item.className = "post-item";
    if (article.date) {
      const time = document.createElement("time");
      time.dateTime = article.date;
      time.textContent = String(article.date).slice(0, 10);
      item.append(time, " ");
    }
    const link = document.createElement("a");
    link.className = "pagelink";
    link.href = article.permalink;
    link.textContent = article.title;
    item.append(link);
    if (article.summary) {
      const summary = document.createElement("p");
      summary.className = "ft-summary";
      summary.textContent = article.summary;
      item.append(summary);
    }
    container.append(item);
  }
}

function update() {
  writeQuery();
  renderExpr();
  markDeadChips();
  renderResults();
}

function readQuery() {
  const p = new URLSearchParams(location.search);
  for (const [tax, term] of p.entries()) setSelected(tax, term, true);
}

toggles.forEach((c) =>
  c.addEventListener("click", () => {
    const tax = c.dataset.tax;
    const term = c.dataset.term;
    const on = !(selected.get(tax) && selected.get(tax).has(term));
    setSelected(tax, term, on);
    update();
  }),
);
if (clearBtn)
  clearBtn.addEventListener("click", () => {
    selected.clear();
    toggles.forEach((c) => paint(c, false));
    update();
  });
expr.addEventListener("click", (e) => {
  const b = e.target.closest(".ft-token");
  if (b) {
    setSelected(b.dataset.tax, b.dataset.term, false);
    update();
  }
});

readQuery();
renderExpr();
renderResults();

fetch(params.indexURL)
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data)) throw new Error("Invalid filter index");
    articles = data.sort((a, b) =>
      String(b.date || "").localeCompare(String(a.date || "")),
    );
    loadState = "ready";
    update();
  })
  .catch((error) => {
    loadState = "error";
    renderResults();
    console.error("Failed to load filter index:", error);
  });
