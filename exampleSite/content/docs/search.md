---
title: 搜索功能
date: 2024-07-01
summary: Lichtung 的 Fuse.js 客端全文搜索配置与使用
tags:
  - 搜索
categories: guide
ai: true
ShowToc: true
---

# 搜索功能

Lichtung 使用 [Fuse.js](https://fusejs.io/) 实现客户端模糊搜索，无需服务端支持。

## 工作原理

1. **构建时**：Hugo 生成 `index.json` 搜索索引文件，包含每篇文章的标题、路径、摘要、正文和分类信息
2. **运行时**：用户在搜索框输入关键词，Fuse.js 在索引中进行模糊匹配
3. **结果展示**：使用 [Mark.js](https://markjs.io/) 高亮匹配关键词并显示摘要上下文

## 启用搜索

### 侧边栏搜索框

在 `hugo.toml` 中设置：

```toml
[params]
ShowSiteSearch = true
```

侧边栏顶部会出现搜索框，可在任何页面使用。每个页面可通过 front matter 单独覆盖：

```yaml
---
ShowSiteSearch: false
---
```

### 索引页内嵌搜索

在 `indexes` 布局的页面中，可嵌入独立的搜索框：

```yaml
---
title: 索引
layout: indexes
ShowSearch: true
ShowSiteSearch: false
---
```

> 注意：`ShowSearch` 和 `ShowSiteSearch` 共享同一 HTML id，同时设为 `true` 会冲突。

## 配置选项

### fuseOpts

控制 Fuse.js 的搜索行为：

```toml
[params]
fuseOpts = { limit = 5, threshold = 0.1 }
```

| 参数        | 默认值 | 说明                                     |
| ----------- | ------ | ---------------------------------------- |
| `limit`     | `5`    | 最大返回结果数                           |
| `threshold` | `0.1`  | 匹配阈值，`0` = 精确匹配，`1` = 匹配所有 |

`threshold` 越低搜索越精确，越高越宽松。`0.1` 适合大多数场景。

### SearchPlaceHolder

搜索框的占位提示文字：

```toml
[params]
SearchPlaceHolder = '搜索 ↵'
```

## 搜索索引内容

### SearchContent

控制搜索索引是否包含文章正文：

```toml
[params]
SearchContent = true
```

| 值      | 效果                                     |
| ------- | ---------------------------------------- |
| `true`  | 索引包含正文，搜索更全面，但索引文件更大 |
| `false` | 索引仅包含标题和摘要，文件更小，搜索更快 |

可在单篇文章中覆盖：

```yaml
---
title: 内部草稿
SearchContent: false
---
```

### 自动排除

以下页面不会出现在搜索索引中：

- `layout: archive` 的归档页
- `layout: about` 的关于页

## 搜索索引格式

构建后在站点根目录生成 `index.json`，格式示例：

```json
[
  {
    "title": "文章标题",
    "file": "posts/my-post/index.html",
    "summary": "文章摘要",
    "content": "文章正文（纯文本，Markdown 已去除）",
    "permalink": "/posts/my-post/",
    "taxonomies": {
      "tags": ["hugo", "教程"],
      "categories": ["指南"]
    }
  }
]
```

## 输出格式

搜索索引依赖 `JSON` 输出格式，在 `hugo.toml` 中已默认启用：

```toml
[outputs]
home = ["HTML", "RSS", "JSON", "CROSSLINKS"]
```

如果移除 `"JSON"`，搜索功能将不可用。

## 自定义搜索

搜索相关的前端资源打包在 `search.js` 中（含 Fuse.js、Mark.js、搜索逻辑），通过 Hugo 的 JS pipeline 自动构建和指纹化，无需手动管理。

如需深度自定义搜索行为，可在站点的 `assets/` 下覆盖主题的搜索脚本，或在主题中修改 `assets/mysearch.js`。搜索框样式可通过 `assets/css/custom/` 覆盖，详见[自定义与扩展](/docs/customization/)。
