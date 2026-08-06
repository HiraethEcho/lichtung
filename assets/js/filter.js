import * as params from "@params";

const I18N = { loading: params.loading, noResults: params.noResults };
const container = document.getElementById("filter-results");
const checkboxes = document.querySelectorAll(".filter-checkbox");
const clearBtn = document.getElementById("clear-filters");
const modes = new Map();

let articles = [];

fetch(params.indexURL)
  .then((r) => r.json())
  .then((data) => {
    articles = Array.isArray(data) ? data : [];
    filter();
  })
  .catch((e) => console.error("Failed to load articles:", e));

checkboxes.forEach((cb) => cb.addEventListener("change", filter));
clearBtn.addEventListener("click", () => {
  checkboxes.forEach((cb) => (cb.checked = false));
  filter();
});

document.querySelectorAll(".filter-list-block-header").forEach((h3) => {
  const tax = h3.dataset.taxonomy;
  modes.set(tax, "and");
  renderHeader(h3);
  h3.style.cursor = "pointer";
  h3.addEventListener("click", () => {
    const cur = modes.get(tax) || "and";
    modes.set(tax, cur === "and" ? "or" : "and");
    renderHeader(h3);
    filter();
  });
});

function renderHeader(h3) {
  h3.dataset.mode = modes.get(h3.dataset.taxonomy) || "and";
}

function getSelected() {
  return Array.from(checkboxes).reduce((acc, cb) => {
    if (cb.checked) {
      const tax = cb.dataset.taxonomy;
      const term = cb.dataset.term;
      (acc[tax] ??= []).push(term);
    }
    return acc;
  }, {});
}

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function filter() {
  const selected = getSelected();
  const keys = Object.keys(selected);
  if (keys.length === 0) {
    container.innerHTML = "";
    return;
  }
  if (!Array.isArray(articles) || articles.length === 0) {
    container.innerHTML = '<li class="post-item">' + I18N.loading + "</li>";
    return;
  }
  const filtered = articles.filter((article) =>
    keys.every((tax) => {
      const terms = selected[tax];
      const articleTerms = article.taxonomies?.[tax] || [];
      const mode = modes.get(tax) || "and";
      return mode === "or"
        ? terms.some((t) => articleTerms.includes(t))
        : terms.every((t) => articleTerms.includes(t));
    }),
  );
  if (filtered.length === 0) {
    container.innerHTML = '<li class="post-item">' + I18N.noResults + "</li>";
    return;
  }
  container.innerHTML = filtered
    .map(
      (a) =>
        `<li class="post-item"><a href="${esc(a.permalink)}" class="pagelink">${esc(a.title)}</a> ${esc(a.summary)}</li>`,
    )
    .join("");
}
