# lichtung-ai Refactor Plan

Status: COMPLETE. All slices done, verified, reviewed.

## Verified bugs (S1) — all fixed

- [x] B1 `_partials/heatmap.html` — JSON via `dict+jsonify+safeJS` (was: hand-rolled commas → invalid JSON)
- [x] B2 `rss.xml` — title/description spacing fixed (`Home on MEMEX`)
- [x] B3 `_partials/site-info.html` — running-days quoted via jsonify (was: unquoted → division/TypeError)
- [x] B4 page/about vs post-fb — unified singular+plural at site AND page level
- [x] B5 `_markup/render-codeblock.html` — copyCode → main.js event delegation (side effect: WordCount -41/page with codeblocks, boilerplate no longer counted)
- [x] B6 `utils/password.html` — jsonify+safeJS
- [x] B7 `mysearch.js` — dup ArrowRight branch + console.log removed
- [x] B8 `rss.xml` — empty-$pages guard

## Refactors — all done

- [x] S2 `_partials/date-aside.html` — 4× date-tree aside extracted
- [x] S3 list templates slimmed (section/term/home/archive); full unification rejected (11 divergent params = god partial, ponytail)
- [x] S4 inline defines → files (postitem, menu-tree, file-tree-walk); menu-deeper+menu-nav merged
- [x] S5 search-assets partial; filter.js extracted (js.Build params); index.json regex chain kept (`.Plain` retains `#` — advisor was right)
- [x] S6 head/js direct; head/css `with` guards (empty-custom safe); blank.css/blank.scss deleted
- [x] S7 `_partials/article.html` shared by page.html + about.html
- [x] S8 comment.html data-driven switcher; dead code deleted (math.html, commented lines, $taxonomyTitles); post-rel $flag → $hasOther; taxonomy if le/else → gt; section-lists Paginate ×1

## Verification — all done

- [x] V1 per-slice memex rebuild + A/B diff (351 pages; only expected diffs: wordcount, jsonify key order, backlink order = pre-existing nondeterminism)
- [x] V2 config matrix (memex 4 configs + exampleSite, nested menus)
- [x] V3 fixture: plural params, page-level override, empty taxonomy, external nested menu URLs
- [x] V4 prettier (touched files only; minified libs reverted)
- [x] V5 review: advisor (advice + DA) on plan; fresh-perspective review on diff (3 findings, all fixed)

## Decisions (from advisor, preserved)

- running-days: client-side JS kept (correct TZ), quoting fixed — no server-side TZ regression
- index.json regex chain: kept (`.Plain` contains `#` heading markers; strips are NOT dead)
- custom css/scss: separate matches + `with` guards (scss concat raw = current behavior)
- math.html: deleted (never referenced; katex is active path)
- net diff: -475 lines (31 files, 678 del / 203 add) + 8 new files
