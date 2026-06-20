---
title: 布局图示
date: 2024-02-15
summary: 用图示展示 Lichtung 主题的页面布局结构，标注各区域对应的配置参数
tags:
  - 配置
  - 布局
categories: guide
ai: true
weight: 3
ShowToc: true
---

# 布局图示

本文用 GoAT 图展示 Lichtung 主题各页面布局的结构，并在图中标注各区域对应的 `hugo.toml` 参数名。

所有页面共享同一整体骨架（图一），`main` 区域的内容因布局类型不同而有差异（图二至图六）。

## 图一：整体页面结构

所有页面共享此骨架。左侧为站点导航（`site-nav`），右侧 `main` 区域的具体结构因布局类型而异。

```goat
+---------------------------------------------------------------+
|  site-header                                                  |
|  .Site.Title .subtitle theme-toggle menus.main                |
+----------+----------------------------------------------------+
|          |                                                    |
| site-nav |   main                                            |
|          |   (layout-specific,                               |
| +------+ |    see diagrams below)                            |
| |search| |                                                    |
| |ShowSi| |                                                    |
| |teSea| |                                                    |
| |rch   | |                                                    |
| +------+ |                                                    |
| |taxono| |                                                    |
| |my-   | |                                                    |
| |tree  | |                                                    |
| |ShowTa| |                                                    |
| |xonom| |                                                    |
| |yTree | |                                                    |
| +------+ |                                                    |
| |file- | |                                                    |
| |tree  | |                                                    |
| |ShowFi| |                                                    |
| |leTre| |                                                    |
| |e     | |                                                    |
| +------+ |                                                    |
| |side  | |                                                    |
| |nav   | |                                                    |
| |ShowSi| |                                                    |
| |teNav | |                                                    |
| +------+ |                                                    |
| |links | |                                                    |
| |ShowSi| |                                                    |
| |teLink| |                                                    |
| +------+ |                                                    |
| |site  | |                                                    |
| |info  | |                                                    |
| |ShowSi| |                                                    |
| |teInf| |                                                    |
| |o     | |                                                    |
| +------+ |                                                    |
|          |                                                    |
+----------+----------------------------------------------------+
|  site-footer                                                  |
|  copyright  Hugo+Lichtung  top-link                           |
+---------------------------------------------------------------+
```

`site-nav` 内部组件（从上到下）：

| 组件       | 参数               | 说明                                                                                              |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------- |
| 搜索框     | `ShowSiteSearch`   | Fuse.js 站内搜索                                                                                  |
| 分类树     | `ShowTaxonomyTree` | 层级式分类浏览                                                                                    |
| 文件树     | `ShowFileTree`     | 内容目录树浏览                                                                                    |
| 侧边导航   | `ShowSiteNav`      | 由 `menus.side` 定义                                                                              |
| 链接与社交 | `ShowSiteLink`     | `params.links` + `params.social`                                                                  |
| 站点信息   | `ShowSiteInfo`     | 描述、字数统计（`ShowSiteCountWords`）、分类统计（`ShowSiteCountTerms`）、运行天数（`StartDate`） |

## 图二：文章页（page / about）

文章页布局对应 `page.html`（普通文章）和 `about.html`（关于页）。两者结构相同，区别仅在于关于页的 `page-header` 内额外显示 `ShowHeatMap`（写作热力图）。

```goat
+---------------------------------------------------------------+
|  page-header                                                  |
|  breadcrumbs post-meta ShowSectionCountWords                  |
|  (tags date wordcount readingtime status AI-mark summary)     |
+-------------------------------------------+-------------------+
|                                           |                   |
|  article                                  | aside             |
|                                           |                   |
|  .Content                                 | +-------+        |
|                                           | |TOC    |        |
|                                           | |ShowToc|        |
|                                           | +-------+        |
|                                           | |related|        |
|                                           | |posts  |        |
|                                           | |ShowRel|        |
|                                           | |Post   |        |
|                                           | +-------+        |
|                                           | |fwd-   |        |
|                                           | |links  |        |
|                                           | |ShowFor|        |
|                                           | |wardLi|        |
|                                           | |nk     |        |
|                                           | +-------+        |
|                                           | |back-  |        |
|                                           | |links  |        |
|                                           | |ShowBa|        |
|                                           | |ckLink|        |
|                                           | +-------+        |
|                                           |                   |
+-------------------------------------------+-------------------+
|  page-footer                                                  |
|  post-info(LastChangeLink) post-nav comment                  |
|  (waline/twikoo/giscus/cwd) copyright                        |
+---------------------------------------------------------------+
```

`page-header` 内的 `post-meta` 显示：分类标签、日期（`DateFormat`）、字数、阅读时间、文章状态标记、AI 标记、摘要。

`aside` 内部组件：

| 组件     | 参数                                             | 说明                   |
| -------- | ------------------------------------------------ | ---------------------- |
| 目录     | `ShowToc`                                        | 文章目录大纲           |
| 相关文章 | `ShowRelPost`、`HugoRelPost`、`HugoRelPostLimit` | 相关推荐文章           |
| 出链     | `ShowForwardLink`                                | 文章中指向的外部链接   |
| 入链     | `ShowBackLink`                                   | 其他文章指向本文的链接 |

`page-footer` 内部组件：

| 组件     | 参数                                        | 说明                                     |
| -------- | ------------------------------------------- | ---------------------------------------- |
| 文章信息 | `LastChangeLink`                            | 最后修改日期 + Git 提交链接              |
| 前后导航 | —                                           | 同章节内的上一篇/下一篇文章              |
| 评论     | `comment`、`waline`/`twikoo`/`giscus`/`cwd` | 评论系统，需在 `[params]` 中启用对应系统 |
| 版权     | `copyright`                                 | CC 许可证类型                            |

关于页特有：`ShowHeatMap` 出现在 `page-header` 中，显示 GitHub 风格的写作热力图。

## 图三：章节/列表页（section / home / term）

章节页（`section.html`）、首页（`home.html`）和分类项页（`term.html`）共享此布局。核心是 `article` 中的内容 + 子章节 + 文章列表。当 `ListStyle = date` 时，右侧出现年月跳转导航。

```goat
+---------------------------------------------------------------+
|  page-header                                                  |
|  breadcrumbs ShowSectionCountWords                            |
+-------------------------------------------+-------------------+
|                                           |                   |
|  article                                  | aside             |
|                                           | (when             |
|  .Content                                 |  ListStyle=date)  |
|                                           |                   |
|  subsections                              | year/month        |
|  ShowSubSection                           | jump-nav          |
|                                           |                   |
|  article-list                             |                   |
|  ListStyle ItemStyle ListLimit            |                   |
|                                           |                   |
+-------------------------------------------+-------------------+
|                                                               |
+---------------------------------------------------------------+
```

`article` 内部组件：

| 组件     | 参数                                | 说明                                                    |
| -------- | ----------------------------------- | ------------------------------------------------------- |
| 内容     | `.Content`                          | 章节 `_index.md` 的正文                                 |
| 子章节   | `ShowSubSection`                    | 嵌套子章节列表                                          |
| 文章列表 | `ShowList`、`ListStyle`、`ItemStyle`、`ListLimit` | 文章列表，`ListStyle` 可选 `list`/`date`/`split`，`ItemStyle` 可选 `card`/`simple` |

`ListStyle = date` 时的子选项：`ShowCountWordsPerYear`、`ShowCountWordsPerMonth`、`ShowPostsPerYear`、`ShowPostsPerMonth`。

首页特有：`ShowAllPagesInHome` 控制首页显示全部文章还是仅 `mainSections` 中的文章。

## 图四：归档页（archive）

归档页（`archive.html`）结构与章节/列表页基本相同，区别在于：`ListStyle` 默认为 `date`，右侧 aside 始终显示年月跳转导航，`ShowAllPagesInArchive` 控制是否显示全站所有文章。

```goat
+---------------------------------------------------------------+
|  page-header                                                  |
|  breadcrumbs ShowSectionCountWords                            |
+-------------------------------------------+-------------------+
|                                           |                   |
|  article                                  | aside             |
|                                           |                   |
|  .Content                                 | year/month        |
|                                           | jump-nav          |
|  article-list                             | (always visible)  |
|  ListStyle=date (default)                 |                   |
|  ShowAllPagesInArchive                    |                   |
|                                           |                   |
+-------------------------------------------+-------------------+
|                                                               |
+---------------------------------------------------------------+
```

| 组件     | 参数                    | 说明                                                            |
| -------- | ----------------------- | --------------------------------------------------------------- |
| 文章列表 | `ShowAllPagesInArchive` | `true` = 全站所有文章，`false` = 同章节列表页逻辑               |
| aside    | —                       | 固定显示年月跳转导航（等同于章节页 `ListStyle=date` 时的 aside） |

## 图五：索引页（indexes）

索引页（`indexes.html`）是一个特殊的聚合页面，没有右侧 aside。`article` 内依次排列搜索框、章节树、分类列表和过滤器。

```goat
+---------------------------------------------------------------+
|  page-header                                                  |
|  breadcrumbs                                                  |
+---------------------------------------------------------------+
|                                                               |
|  article                                                      |
|                                                               |
|  .Content                                                     |
|                                                               |
|  +----------------------------------------------------------+ |
|  | search-box  ShowSearch                                   | |
|  +----------------------------------------------------------+ |
|  | section-tree                                             | |
|  +----------------------------------------------------------+ |
|  | taxonomy-list (with counts)                              | |
|  +----------------------------------------------------------+ |
|  | filter  ShowFilter                                       | |
|  +----------------------------------------------------------+ |
|                                                               |
+---------------------------------------------------------------+
```

`article` 内部组件（从上到下）：

| 组件     | 参数                         | 说明                 |
| -------- | ---------------------------- | -------------------- |
| 搜索框   | `ShowSearch`（front matter） | 站内搜索入口         |
| 章节树   | —                            | 全站章节结构导航     |
| 分类列表 | —                            | 各分类及其条目计数   |
| 过滤器   | `ShowFilter`                 | 基于分类的多维度筛选 |

## 图六：分类页（taxonomy）

分类页（`taxonomy.html`）展示某个分类维度下的所有 term（如 `/tags/` 下的所有标签）。右侧 aside 为 term 跳转导航。

```goat
+---------------------------------------------------------------+
|  page-header                                                  |
|  breadcrumbs                                                  |
+-------------------------------------------+-------------------+
|                                           |                   |
|  article                                  | aside             |
|                                           |                   |
|  .Content                                 | term              |
|                                           | jump-nav          |
|  term-list                                |                   |
|  (PostPerTermLimit                        |                   |
|   articles per term)                      |                   |
|                                           |                   |
+-------------------------------------------+-------------------+
|                                                               |
+---------------------------------------------------------------+
```

| 组件      | 参数               | 说明                         |
| --------- | ------------------ | ---------------------------- |
| term 列表 | `PostPerTermLimit` | 每个 term 下最多显示的文章数 |
| aside     | —                  | 所有 term 的页内跳转链接     |
