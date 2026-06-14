---
title: 自定义与扩展
date: 2024-09-01
summary: 自定义 CSS/SCSS、图标系统、页脚、版权协议等主题扩展方法
tags:
  - 自定义
categories: guide
ai: true
ShowToc: true
---

# 自定义与扩展

Lichtung 支持多种方式扩展和自定义主题外观。

## 自定义 CSS / SCSS

主题会自动加载 `css/custom/` 目录下的所有 CSS 和 SCSS 文件：

```
assets/
└── css/
    └── custom/
        ├── override.scss   # 覆盖主题变量
        └── extra.css       # 额外样式
```

文件按名称排序后追加到主题默认样式表末尾，可覆盖任何主题样式。

### 常用覆盖示例

```scss
// assets/css/custom/override.scss

// 修改主题色
:root {
  --accent: #2d7d46;
}

// 修改字体
body {
  font-family: "Noto Serif SC", serif;
}
```

### CSS pipeline

主题将所有 SCSS 文件编译、合并、压缩为一个指纹化的 `stylesheet.css`，自定义文件自动纳入此流程，无需手动引入 `<link>` 标签。

## 图标系统

主题内置 100+ SVG 图标，定义在 `data/icons.yaml`，基于 [Heroicons](https://heroicons.com/) v1 + 自定义图标。

### 使用图标

社交链接和侧边栏链接通过 `icon` 字段引用图标名：

```toml
[[params.social]]
name = 'github'
url = 'https://github.com/username'
icon = 'github'
```

```toml
[[params.links]]
name = '文档'
url = 'https://docs.example.com'
description = '技术文档'
icon = 'book-open'
```

### 可用图标

常用图标名（完整列表见主题 `data/icons.yaml`）：

| 图标名      | 用途      |
| ----------- | --------- |
| `github`    | GitHub    |
| `gitlab`    | GitLab    |
| `codeberg`  | Codeberg  |
| `bitbucket` | Bitbucket |
| `rss`       | RSS 订阅  |
| `mail`      | 邮件      |
| `bilibili`  | B 站      |
| `link`      | 通用链接  |
| `book-open` | 文档      |
| `globe`     | 网站      |
| `star`      | 置顶标记  |

其余图标名对应 Heroicons v1 的 outlined 系列，如 `home`、`document`、`pencil`、`tag` 等。

### 添加自定义图标

在站点的 `data/icons.yaml` 中追加 SVG 内容即可：

```yaml
# data/icons.yaml
myicon: >
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="..." />
  </svg>
```

之后在任何 `icon` 字段中使用 `"myicon"` 即可。模板中通过 `partials/icon.html` 渲染，找不到指定图标时回退为 `link` 图标。

## 页脚自定义

### 自定义文本

```toml
[params]
footer = '© 2024 我的站点'
```

设置后页脚左侧显示自定义文本，否则显示默认的版权信息。

### 版权协议

页脚右侧显示 Creative Commons 协议，全局默认：

```toml
[params]
copyright = 'nc-sa'
```

单篇文章可覆盖：

```yaml
---
title: 原创文章
copyright: by-nc-nd
---
```

常见值：

| 值         | 协议                    |
| ---------- | ----------------------- |
| `by`       | CC BY 4.0               |
| `by-sa`    | CC BY-SA 4.0            |
| `by-nc`    | CC BY-NC 4.0            |
| `nc-sa`    | CC BY-NC-SA 4.0（默认） |
| `by-nd`    | CC BY-ND 4.0            |
| `by-nc-nd` | CC BY-NC-ND 4.0         |

### 页脚结构

页脚固定显示以下信息：

- 版权协议（全局或页面级）
- "Powered by Hugo & Lichtung" 链接
- 自定义文本（如有）
- 返回顶部链接

## 暗色模式

主题支持暗色模式，通过顶栏的对比度图标切换：

- 首次访问时跟随系统偏好（`prefers-color-scheme`）
- 手动切换后，选择保存在 `localStorage`
- 下次访问优先使用保存的选择

暗色模式为 CSS 变量切换实现，无需重新加载页面。

## Giscus 跟随暗色模式

Giscus 评论系统自动使用 `preferred_color_scheme` 主题，随暗色模式切换而变化。

## 自定义 JS

主题的 JS 通过 Hugo pipeline 构建（`assets/main.js`），生产环境下自动压缩并添加 SRI integrity 属性。

如需注入额外的 JavaScript，可在 `layouts/partials/` 下创建覆盖模板。
