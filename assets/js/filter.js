import * as params from "@params";

const I18N = {
  loading: params.loading,
  noResults: params.noResults,
  match: params.matchLabel,
  and: params.andWord,
  or: params.orWord,
};

// Fixed semantics: cross-taxonomy AND, inside-taxonomy OR.
// Chip click toggles selection (color indicates state); ↗ opens the term page.
// No selection => no results shown. No dynamic facet counts.
// Chip toggle replaced by .ft-toggle glyph buttons; links are plain .sectionlink.
const toggles = Array.from(document.querySelectorAll(".ft-toggle"));
const groups = Array.from(document.querySelectorAll(".ft-group"));
const container = document.getElementById("filter-results");
const header = document.querySelector(".ft-results-header");
const expr = document.getElementById("filter-expr");
const clearBtn = document.getElementById("clear-filters");

const labels = {};
groups.forEach((g) => (labels[g.dataset.tax] = g.dataset.label));

const selected = new Map(); // tax -> Set(term)
let articles = [];

// State lives in aria-pressed; CSS draws the box + check.
// .ft-none marker on the parent .ft-item = selecting it would yield 0 results.
function paint(el, on) {
  el.setAttribute("aria-pressed", on ? "true" : "false");
}

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str == null ? "" : String(str);
  return d.innerHTML;
}

function chipEl(tax, term) {
  return toggles.find(
    (c) => c.dataset.tax === tax && c.dataset.term === term,
  );
}

function setSelected(tax, term, on) {
  const set = selected.get(tax) || new Set();
  if (on) set.add(term);
  else set.delete(term);
  if (set.size) selected.set(tax, set);
  else selected.delete(tax);
  const el = chipEl(tax, term);
  if (el) paint(el, on);
}

function writeQuery() {
  const p = new URLSearchParams();
  selected.forEach((set, tax) => set.forEach((t) => p.append(tax, t)));
  const q = p.toString();
  history.replaceState(
    null,
    "",
    q ? location.pathname + "?" + q : location.pathname,
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
    item.classList.toggle("ft-none", !!articles.length && wouldBeEmpty(c.dataset.tax, c.dataset.term));
  });
}

function renderExpr() {
  if (!selected.size) {
    expr.hidden = true;
    expr.innerHTML = "";
    return;
  }
  expr.hidden = false;
  const parts = [];
  for (const [tax, terms] of selected) {
    const toks = Array.from(terms).map(
      (t) =>
        '<button class="ft-token" data-tax="' +
        esc(tax) +
        '" data-term="' +
        esc(t) +
        '">' +
        esc(t) +
        " ×</button>",
    );
    parts.push(
      "(" +
        esc(labels[tax] || tax) +
        ": " +
        toks.join(" " + esc(I18N.or) + " ") +
        ")",
    );
  }
  expr.innerHTML = esc(I18N.match) + " " + parts.join(" " + esc(I18N.and) + " ");
}

function matches(article) {
  for (const [tax, terms] of selected) {
    const at = (article.taxonomies && article.taxonomies[tax]) || [];
    if (!Array.from(terms).some((t) => at.includes(t))) return false;
  }
  return true;
}

function renderResults() {
  if (!selected.size) {
    header.hidden = true;
    container.innerHTML = "";
    return;
  }
  header.hidden = false;
  if (!articles.length) {
    container.innerHTML =
      '<li class="post-item">' + esc(I18N.loading) + "</li>";
    return;
  }
  const list = articles
    .filter((a) => matches(a))
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  if (!list.length) {
    container.innerHTML =
      '<li class="post-item">' + esc(I18N.noResults) + "</li>";
    return;
  }
  container.innerHTML = list
    .map((a) => {
      const d = String(a.date || "").slice(0, 10);
      return (
        '<li class="post-item">' +
        (d
          ? '<time datetime="' + esc(a.date) + '">' + esc(d) + "</time> "
          : "") +
        '<a href="' +
        esc(a.permalink) +
        '" class="pagelink">' +
        esc(a.title) +
        "</a>" +
        (a.summary ? '<p class="ft-summary">' + esc(a.summary) + "</p>" : "") +
        "</li>"
      );
    })
    .join("");
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

fetch(params.indexURL)
  .then((r) => r.json())
  .then((data) => {
    articles = Array.isArray(data) ? data : [];
    readQuery();
    update();
  })
  .catch((e) => console.error("Failed to load filter index:", e));
