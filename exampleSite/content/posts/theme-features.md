---
title: 主题功能展示
date: 2024-03-10
summary: 展示 Lichtung 主题特有的功能和 front matter 配置项
tags:
  
  - 主题
categories: 教程
weight: 1
ShowToc: true
ShowRelPost: true
ShowForwardLink: true
ShowBackLink: true
comment: true
---

# 主题功能展示

本文展示 Lichtung 主题的特有功能。

## Front Matter 用法

### 控制文章列表显示

设置 `ShowList: false` 时，栏目页不显示该文章，仅在直接访问时可见。

### 置顶文章

设置 `weight` 值可以让文章在列表中置顶。本文设置了 `weight: 1`，因此会排在其他文章前面。

### 布局切换

```yaml
layout: about        # 使用 about 页面布局（显示热力图）
layout: archive      # 使用归档布局（按年月归档所有文章）
layout: indexes      # 使用索引布局（搜索+栏目+分类+筛选器）
layout: home         # 使用首页布局
```

### 隐藏文件树

```yaml
HideInFileTree: true # 不在侧边栏文件树中显示此页面
```

### 密码保护

为文章设置密码保护（简单的 JavaScript 弹窗验证）：

```yaml
password: "mypassword"
```

试着给某个页面设置 `password` 字段，访问时需要输入密码。

## 文章功能

### 目录

文章右侧的目录（TOC）通过 `ShowToc` 控制。可以在站点级别全局设置，也可以在单篇文章的 front matter 中覆盖。

### 相关文章

侧边栏的"相关文章"基于分类和标签的匹配度自动推荐。使用 Hugo 原生相关内容引擎（`HugoRelPost = true`），或者使用基于 taxonomy 的自定义推荐。

### 出链和入链

当文章 A 链接到文章 B 时：

- 文章 A 的侧边栏会显示"出链"（指向 B）
- 文章 B 的侧边栏会显示"入链"（来自 A）

这个功能通过 `render-link.crosslinks.json` 钩子和 CROSSLINKS 输出格式实现。

下方链接到第一篇文章进行演示：

→ 查看[第一篇文章](/posts/first-post/)

### 前后文章导航

文章底部有上/下一篇文章的导航链接，基于同栏目下的排序。

## 评论系统

Lichtung 支持四种评论系统，可在页面右上角切换：

1. **Waline** — 基于 LeanCloud 的评论系统
2. **Twikoo** — 腾讯云函数驱动的评论系统
3. **Giscus** — 基于 GitHub Discussions
4. **CWD** — 自部署评论组件

通过 `comment: true/false` 在 front matter 中控制当前页面是否显示评论。

## 暗色模式

点击顶栏的 ☼/☽ 按钮切换明暗主题。偏好设置保存在 `localStorage` 中，刷新页面不会丢失。

系统深色模式偏好会被自动检测。
