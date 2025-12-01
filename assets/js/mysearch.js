import * as params from "@params";
const contextRange = 20;

let fuse; // holds our search engine
let resList = document.getElementById("searchResults");
let sInput = document.getElementById("searchInput");
let first,
  last,
  current_elem = null;
let resultsAvailable = false;

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

window.onload = function () {
  fetch("/index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data) {
        fuse = new Fuse(data, options); // build the index from the json file
      }
    })
    .catch((error) => {
      console.log(error.message || "Failed to load search index");
    });
};

function activeToggle(ae) {
  document.querySelectorAll(".focus").forEach(function (element) {
    // rm focus class
    element.classList.remove("focus");
  });
  if (ae) {
    ae.focus();
    document.activeElement = current_elem = ae;
    ae.parentElement.classList.add("focus");
  } else {
    document.activeElement.parentElement.classList.add("focus");
  }
}

function reset() {
  resultsAvailable = false;
  resList.innerHTML = sInput.value = ""; // clear inputbox and searchResults
  sInput.focus(); // shift focus to input box
}

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

// execute search as each character is typed
sInput.onkeyup = function (e) {
  resList.innerHTML = "";
  resultsAvailable = false;
  const maxResults = 8;
  const searchTerm = this.value.trim();
  if (!searchTerm) {
    return;
  }
  if (fuse) {
    let results;
    if (params.fuseOpts) {
      results = fuse.search(searchTerm, {
        limit: params.fuseOpts.limit || maxResults,
      });
    } else {
      results = fuse.search(searchTerm, { limit: maxResults });
    }
    console.log(results.length);
    if (results.length !== 0) {
      for (let item in results) {
        const listItem = document.createElement("li");
        listItem.className = "side-entry";
        const link = document.createElement("a");
        link.className = "pagelink";
        link.href = results[item].item.permalink;
        link.textContent = results[item].item.title;
        const contentContainer = document.createElement("p");
        contentContainer.className = "search-result-content";
        const originalContent = results[item].item.content || "";
        const contentSnippet = extractContentSnippet(
          originalContent,
          searchTerm,
        );
        contentContainer.textContent = contentSnippet;

        listItem.appendChild(link);
        listItem.appendChild(contentContainer);

        resList.appendChild(listItem);
        if (contentContainer.textContent) {
          const instance = new Mark(contentContainer);
          instance.mark(searchTerm, {
            element: "strong",
            separateWordSearch: true,
          });
        }
      }
      resultsAvailable = true;
      first = resList.firstChild;
      last = resList.lastChild;
    } else {
      resultsAvailable = false;
      resList.innerHTML = "No results";
    }
  }
};

sInput.addEventListener("search", function (e) {
  // clicked on x
  if (!this.value) reset();
});

// kb bindings
document.onkeydown = function (e) {
  let key = e.key;
  let ae = document.activeElement;
  let inbox = document.getElementById("searchbox").contains(ae);

  if (ae === sInput) {
    let elements = document.getElementsByClassName("focus");
    while (elements.length > 0) {
      elements[0].classList.remove("focus");
    }
  } else if (current_elem) ae = current_elem;

  if (key === "Escape") {
    reset();
  } else if (!resultsAvailable || !inbox) {
    return;
  } else if (key === "ArrowDown") {
    e.preventDefault();
    if (ae == sInput) {
      const firstLink = resList.firstChild?.firstChild;
      if (firstLink) {
        activeToggle(firstLink);
      }
    } else if (ae.parentElement != last) {
      const nextLink = ae.parentElement.nextSibling?.firstChild;
      if (nextLink) {
        activeToggle(nextLink);
      }
    }
  } else if (key === "ArrowUp") {
    e.preventDefault();
    if (ae.parentElement == first) {
      // if the currently focused element is first item, go to input box
      activeToggle(sInput);
    } else if (ae != sInput) {
      const prevLink = ae.parentElement.previousSibling?.firstChild;
      if (prevLink) {
        activeToggle(prevLink);
      }
    }
  } else if (key === "ArrowRight" || key === "Enter") {
    e.preventDefault();
    let linkToClick;

    if (ae === sInput && first) {
      linkToClick = first.firstChild;
    } else if (ae.tagName === "A") {
      linkToClick = ae;
    } else if (ae.parentElement && ae.parentElement.tagName === "LI") {
      linkToClick = ae.parentElement.firstChild;
    }

    if (linkToClick && linkToClick.tagName === "A") {
      linkToClick.click();
    }
  } else if (key === "ArrowRight") {
    ae.click(); // click on active link
  }
};
