---
title: 主题选项
date: 2024-02-01
summary: Lichtung 主题所有可配置参数的完整参考
tags:
  - 配置
categories: guide
ai: true
weight: 2
ShowToc: true
---

# 主题选项

本文列出 Lichtung 主题在 `hugo.toml` `[params]` 下的所有配置项。

> 各参数对应页面的哪个区域？参见[布局图示](/docs/layout-diagrams)。

## 站点信息

```toml
[params]
subtitle = '林中空地'                # 副标题，显示在顶栏标题下方
description = 'Lichtung Hugo 主题示例站点，展示功能'       # 站点描述，显示在侧边栏
author = { name = 'Demo', email = 'demo@example.com' }
StartDate = '2023/06/23'                # 建站日期，侧边栏显示"已运行 X 天"
```

| 参数          | 说明                        |
| ------------- | --------------------------- |
| `subtitle`    | 顶栏标题下方的副标题        |
| `description` | 侧边栏站点描述              |
| `author`      | 作者信息（name + email）    |
| `StartDate`   | 建站日期，格式 `YYYY/MM/DD` |

## 通用选项

| 参数               | 默认值         | 说明                                         |
| ------------------ | -------------- | -------------------------------------------- |
| `DateFormat`       | `'2006/01/02'` | 日期显示格式（Go 时间格式）                  |
| `ShowContentinRSS` | `true`         | RSS 中是否包含全文（`false` = 仅摘要）       |
| `comment`          | `true`         | 全局评论开关，单篇可覆盖                     |
| `math`             | `false`        | 全局 MathJax 开关，单篇可覆盖                |
| `LastChangeLink`   | `''`           | Git 提交历史链接前缀（如 GitHub commit URL） |
| `footer`           | `''`           | 页脚自定义文本                               |
| `copyright`        | `nc-sa`        | 默认 CC 协议后缀，单篇可覆盖                 |

## 侧边栏组件

每个组件独立开关：

| 参数                 | 说明                                          |
| -------------------- | --------------------------------------------- |
| `ShowSiteSearch`     | 搜索框（Fuse.js 全文搜索）                    |
| `SearchContent`      | 搜索索引是否包含正文                          |
| `SearchPlaceHolder`  | 搜索框占位文字                                |
| `ShowTaxonomyTree`   | 分类树                                        |
| `ShowFileTree`       | 文件树（content/ 目录结构），可设置文件树起点 |
| `ShowSiteNav`        | 侧边栏导航（`menus.side`）                    |
| `ShowSiteInfo`       | 站点信息面板                                  |
| `ShowSiteCountWords` | 信息面板中的全站字数/篇数统计                 |
| `ShowSiteCountTerms` | 信息面板中的全站分类统计                      |
| `ShowSiteLink`       | 外部链接列表                                  |

侧边栏本身可通过顶栏 ≡ 按钮整体切换显示/隐藏。

## 章节页面列表选项

控制首页、章节页、标签页的文章列表：

| 参数             | 说明           | 可选值                                   |
| ---------------- | -------------- | ---------------------------------------- |
| `ListType`       | 列表样式       | `'plain'`, `'date'`, `'list'`, `'split'` |
| `ListLimit`      | 每页文章数上限 | 数字或空（不限）                         |
| `ShowList`       | 是否显示列表   | `true`, `false`                          |
| `ShowSubSection` | 是否显示子栏目 | `true`, `false`                          |

**四种 ListType**：

| 值      | 效果                                     |
| ------- | ---------------------------------------- |
| `plain` | 文章卡片列表，显示标题、日期、摘要、标签 |
| `date`  | 按年月分组（归档风格），年份侧边栏导航   |
| `list`  | 极简列表——只有标题和日期                 |
| `split` | 分页显示，底部分页导航                   |

`date` 样式的子选项：

| 参数                     | 说明                     |
| ------------------------ | ------------------------ |
| `ShowCountWordsPerYear`  | 每年标题旁显示字数和篇数 |
| `ShowCountWordsPerMonth` | 每月标题旁显示字数和篇数 |
| `ShowPostsPerYear`       | 每年标题旁显示篇数       |
| `ShowPostsPerMonth`      | 每月标题旁显示篇数       |

_见 [列表样式展示](/docs/list-types/)。_

## 文章选项

| 参数               | 默认值 | 说明                           |
| ------------------ | ------ | ------------------------------ |
| `ShowToc`          | `true` | 文章右侧目录（TOC）            |
| `ShowRelPost`      | `true` | 相关文章推荐                   |
| `HugoRelPost`      | `true` | 使用 Hugo 内置相关内容引擎     |
| `HugoRelPostLimit` | `10`   | 相关文章数量上限               |
| `ShowForwardLink`  | `true` | 显示出链（本文链接到哪些页面） |
| `ShowBackLink`     | `true` | 显示入链（哪些页面链接到本文） |

> 出入链工作原理见 [出入链功能演示](/docs/crosslinks-demo/)。

## 首页选项

| 参数                 | 默认值  | 说明                                     |
| -------------------- | ------- | ---------------------------------------- |
| `ShowAllPagesInHome` | `false` | `false` = 仅显示 `mainSections` 中的文章 |

```toml
mainSections = ['posts']   # 首页只显示 posts 栏目的文章
```

## 归档页选项

| 参数                    | 默认值 | 说明                              |
| ----------------------- | ------ | --------------------------------- |
| `ShowAllPagesInArchive` | `true` | `true` = 显示所有文章（不限栏目） |

## 特殊页面选项

| 参数          | 默认值 | 说明                                       |
| ------------- | ------ | ------------------------------------------ |
| `ShowHeatMap` | `true` | `layout: about` 页面显示写作热力图         |
| `ShowFilter`  | `true` | `layout: indexes` 页面显示 taxonomy 筛选器 |

## 评论系统

Lichtung 支持四种评论系统，通过顶栏 radio 按钮切换。每个系统有独立开关和配置。

| 系统       | 开关参数 | 说明                         |
| ---------- | -------- | ---------------------------- |
| **CWD**    | `cwd`    | 自部署轻量评论系统           |
| **Waline** | `waline` | 基于 LeanCloud 的评论系统    |
| **Twikoo** | `twikoo` | 腾讯云/Zeabur 部署的评论系统 |
| **Giscus** | `giscus` | 基于 GitHub Discussions      |

```toml
# Waline
waline = true
walineserver = 'https://your-server.example.com'

# Twikoo
twikoo = true
twikooenvId = 'your-env-id'
twikoojs = 'https://cdn.jsdelivr.net/npm/twikoo@latest/dist/twikoo.all.min.js'

# Giscus
giscus = true
gcsdata = {
  repo = "user/repo",
  repoid = "R_kgDOxxx",
  category = "General",
  categoryid = "DIC_kwxxx",
  mapping = "title",
  position = "top",
  lang = "zh-CN"
}
```

## 搜索

| 参数               | 默认值                           | 说明                         |
| ------------------ | -------------------------------- | ---------------------------- |
| `fuseOpts`         | `{ limit = 5, threshold = 0.1 }` | Fuse.js 搜索配置             |
| `PostPerTermLimit` | `5`                              | 分类页每 term 最多展示文章数 |

详见[搜索功能](/docs/search/)与[索引与筛选](/docs/indexes-filter/)。

## 外部链接与社交

```toml
# 侧边栏链接列表（需 ShowSiteLink = true）
[[params.links]]
name = '文档'
url = 'https://docs.example.com'
description = '技术文档'

# 社交图标（显示在侧边栏底部）
[[params.social]]
name = 'github'
url = 'https://github.com/username'
icon = 'github'

[[params.social]]
name = 'rss'
url = '/index.xml'
icon = 'rss'
```

`icon` 可用值：`github`, `bilibili`, `codeberg`, `gitlab`, `bitbucket`, `hugo`, `rss`, `mail` 等（定义在 `data/icons.yaml`）。

自定义 CSS、图标和页脚见[自定义与扩展](/docs/customization/)。

## Markdown 渲染选项

```toml
[markup]
  [markup.tableOfContents]
  endLevel = 5              # 目录显示到第几级标题
  startLevel = 2            # 目录从第几级开始

  [markup.goldmark]
    [markup.goldmark.extensions]
    definitionList = true
    table = true
    taskList = true

    [markup.goldmark.extensions.extras]
    [markup.goldmark.extensions.extras.delete]
    enable = true           # ~~删除文本~~
    [markup.goldmark.extensions.extras.insert]
    enable = true           # ++插入文本++
    [markup.goldmark.extensions.extras.mark]
    enable = true           # ==标记文本==
    [markup.goldmark.extensions.extras.subscript]
    enable = true           # ~下标~
    [markup.goldmark.extensions.extras.superscript]
    enable = true           # ^上标^

    [markup.goldmark.extensions.passthrough]
    enable = true           # MathJax 数学公式
    [markup.goldmark.extensions.passthrough.delimiters]
    block = [['\[', '\]'], ['$$', '$$']]
    inline = [['\(', '\)']]

    [markup.goldmark.parser.attribute]
    block = true            # 块级属性 {#id .class}
    title = true            # 行内属性

    [markup.goldmark.renderer]
    unsafe = true           # 允许 HTML（主题必须）
```

> 渲染效果见 [Markdown 功能展示](/docs/markdown-showcase/)。

## Front Matter 参考

Lichtung 专有的 front matter 字段——所有字段可在单篇文章中覆盖全局设置：

| 字段               | 类型   | 说明                                              |
| ------------------ | ------ | ------------------------------------------------- |
| `layout`           | string | 布局模板（`about`, `archive`, `indexes`, `home`） |
| `summary`          | string | 文章摘要，显示在列表和 meta 中                    |
| `weight`           | int    | 置顶权重，越大越靠前                              |
| `status`           | string | 文章状态标记（如 `wip`, `done`）                  |
| `ai`               | bool   | 标记为 AI 生成内容，不计入字数统计                |
| `password`         | string | 密码保护（客户端弹窗）                            |
| `math`             | bool   | 启用 MathJax                                      |
| `comment`          | bool   | 是否显示评论                                      |
| `ShowToc`          | bool   | 是否显示目录                                      |
| `ShowRelPost`      | bool   | 是否显示相关文章                                  |
| `ShowForwardLink`  | bool   | 是否显示出链                                      |
| `ShowBackLink`     | bool   | 是否显示入链                                      |
| `ShowSiteSearch`   | bool   | 是否显示侧边栏搜索框                              |
| `ShowTaxonomyTree` | bool   | 是否显示侧边栏 taxonomy 树                        |
| `ShowFileTree`     | bool   | 是否显示侧边栏文件树                              |
| `ShowSiteNav`      | bool   | 是否显示侧边栏菜单                                |
| `ShowSiteInfo`     | bool   | 是否显示侧边栏站点信息                            |
| `ShowSiteLink`     | bool   | 是否显示侧边栏链接列表                            |
| `ShowList`         | bool   | 是否在栏目列表中显示                              |
| `ListType`         | string | 列表样式（覆盖全局）                              |
| `ListLimit`        | int    | 列表上限（覆盖全局）                              |
| `ShowSubSection`   | bool   | 是否显示子栏目                                    |
| `HideInFileTree`   | bool   | 在侧边栏文件树中隐藏此页面                        |
| `FileTreeRoot`     | string | 文件树的根节点                                    |
| `rss`              | bool   | 是否包含在 RSS 中                                 |
| `SearchContent`    | bool   | 是否包含在搜索索引中                              |
| `ShowContentinRSS` | bool   | RSS 是否包含全文                                  |
| `copyright`        | string | 文章版权协议（覆盖全局）                          |
| `CountWords`       | bool   | 是否计入全站字数统计                              |

> 实际用法见 [选项示例](/docs/option-examples/)。
