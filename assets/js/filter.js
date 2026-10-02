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
const chips = Array.from(document.querySelectorAll(".ft-chip"));
const groups = Array.from(document.querySelectorAll(".ft-group"));
const container = document.getElementById("filter-results");
const header = document.querySelector(".ft-results-header");
const expr = document.getElementById("filter-expr");
const clearBtn = document.getElementById("clear-filters");

const labels = {};
groups.forEach((g) => (labels[g.dataset.tax] = g.dataset.label));

const selected = new Map(); // tax -> Set(term)
let articles = [];

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str == null ? "" : String(str);
  return d.innerHTML;
}

function chipEl(tax, term) {
  return chips.find(
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
  if (el) el.setAttribute("aria-pressed", on ? "true" : "false");
}

function writeHash() {
  const obj = {};
  selected.forEach((set, tax) => (obj[tax] = Array.from(set)));
  history.replaceState(
    null,
    "",
    Object.keys(obj).length
      ? "#f=" + encodeURIComponent(JSON.stringify(obj))
      : location.pathname + location.search,
  );
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
  writeHash();
  renderExpr();
  renderResults();
}

function readHash() {
  const m = location.hash.match(/^#f=(.+)$/);
  if (!m) return;
  try {
    const obj = JSON.parse(decodeURIComponent(m[1]));
    Object.entries(obj).forEach(([tax, terms]) =>
      (terms || []).forEach((t) => setSelected(tax, t, true)),
    );
  } catch (e) {
    console.error("Bad filter hash:", e);
  }
}

chips.forEach((c) =>
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
    chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
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
    readHash();
    update();
  })
  .catch((e) => console.error("Failed to load filter index:", e));
