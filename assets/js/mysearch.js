import * as params from "@params";
const contextRange = 20;

let fuse; // holds our search engine
const resList = document.getElementById("searchResults");
const sInput = document.getElementById("searchInput");
const searchBox = document.getElementById("searchbox");

let options = {
  distance: 50,
  threshold: 0.1,
  ignoreLocation: true,
  findAllMatches: false,
  keys: [
    { name: "file", weight: 0.8 },
    { name: "title", weight: 0.8 },
    { name: "summary", weight: 0.7 },
    { name: "content", weight: 0.4 },
  ],
};
if (params.fuseOpts) {
  options = {
    keys: params.fuseOpts.keys ?? [
      { name: "file", weight: 0.8 },
      { name: "title", weight: 0.8 },
      { name: "summary", weight: 0.7 },
      { name: "content", weight: 0.4 },
    ],
    distance: params.fuseOpts.distance ?? 50,
    threshold: params.fuseOpts.threshold ?? 0.1,
    ignoreLocation: params.fuseOpts.ignorelocation ?? true,
    isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
    includeScore: params.fuseOpts.includescore ?? false,
    includeMatches: params.fuseOpts.includematches ?? false,
    minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
    shouldSort: params.fuseOpts.shouldsort ?? true,
    findAllMatches: params.fuseOpts.findallmatches ?? false,
  };
}

// Deferred scripts can load the index immediately, without waiting for images.
fetch(params.indexURL ?? "/index.json")
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then((data) => {
    fuse = new Fuse(data, options);
    renderSearch(); // Include a query entered while the index was loading.
  })
  .catch((error) => console.error("Failed to load search index:", error));

function reset() {
  sInput.value = "";
  renderSearch();
  sInput.focus();
}

// Derive the highlight from actual focus, including mouse and Tab navigation.
searchBox.addEventListener("focusin", () => {
  for (const item of resList.children) {
    item.classList.toggle("focus", item.contains(document.activeElement));
  }
});
searchBox.addEventListener("focusout", (event) => {
  if (!searchBox.contains(event.relatedTarget)) {
    resList
      .querySelectorAll(".focus")
      .forEach((item) => item.classList.remove("focus"));
  }
});

function extractContentSnippet(text, searchTerm) {
  if (!text || !searchTerm) return "";
  const lowerText = text.toLowerCase();
  const lowerSearchTerm = searchTerm.toLowerCase();
  const searchIndex = lowerText.indexOf(lowerSearchTerm);
  if (searchIndex === -1) {
    return text.substring(0, contextRange * 1.5) + "...";
  }
  const startPos = Math.max(0, searchIndex - contextRange);
  const endPos = Math.min(
    text.length,
    searchIndex + searchTerm.length + contextRange,
  );
  let snippet = "";
  if (startPos > 0) {
    snippet += "...";
  }
  snippet += text.substring(startPos, endPos);
  if (endPos < text.length) {
    snippet += "...";
  }
  return snippet;
}

function renderSearch() {
  resList.replaceChildren();
  const searchTerm = sInput.value.trim();
  if (!searchTerm || !fuse) return;
  const results = fuse.search(searchTerm, {
    limit: params.fuseOpts?.limit ?? 8,
  });
  if (!results.length) {
    resList.textContent = "No results";
    return;
  }
  for (const { item } of results) {
    const listItem = document.createElement("li");
    listItem.className = "side-entry";
    const link = document.createElement("a");
    link.className = "pagelink";
    link.href = item.permalink;
    link.textContent = item.title;
    const content = document.createElement("p");
    content.className = "search-result-content";
    content.textContent = extractContentSnippet(item.content || "", searchTerm);
    listItem.append(link, content);
    resList.append(listItem);
    if (content.textContent) {
      new Mark(content).mark(searchTerm, {
        element: "strong",
        separateWordSearch: true,
      });
    }
  }
}

sInput.addEventListener("input", renderSearch);
sInput.addEventListener("search", renderSearch);

searchBox.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  const active = document.activeElement;
  const links = Array.from(resList.querySelectorAll("a"));
  const index = links.indexOf(active);
  if (active !== sInput && index < 0) return;
  if (event.key === "Escape") {
    event.preventDefault();
    reset();
  } else if (links.length && event.key === "ArrowDown") {
    event.preventDefault();
    links[Math.min(index + 1, links.length - 1)].focus();
  } else if (links.length && event.key === "ArrowUp") {
    event.preventDefault();
    (index <= 0 ? sInput : links[index - 1]).focus();
  } else if (links.length && event.key === "Enter" && active === sInput) {
    event.preventDefault();
    links[0].click();
  }
});
