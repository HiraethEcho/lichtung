---
title: 使用与安装
date: 2024-01-15
summary: 如何安装 Hugo、配置 Lichtung 主题、创建内容
tags:
  - 入门
categories: guide
ai: true
---

# 使用与安装

从零开始，用 Hugo + Lichtung 搭建你的站点。

## 前置要求

安装 Hugo（Extended 版，v0.120+）：

```bash
# Arch Linux
sudo pacman -S hugo

# macOS
brew install hugo

# 其他系统见 https://gohugo.io/installation/
```

## 快速体验

直接运行 exampleSite 预览主题：

```bash
cd themes/lichtung/exampleSite
hugo server
```

浏览器打开 `http://localhost:1313/lichtung` 即可看到完整站点。

## 新建站点

```bash
# 创建新站点
hugo new site my-site

# 将主题克隆到 themes 目录
cd my-site/themes
git clone https://github.com/hiraethecho/lichtung.git

# 复制配置
cp lichtung/exampleSite/hugo.toml ../hugo.toml

# 复制示例内容（可选）
cp -r lichtung/exampleSite/content ../content

# 启动开发服务器
cd ..
hugo server
```

## 基础配置

站点配置于`hugo.toml`

```toml
baseURL = 'https://example.com/'
title = '我的站点'
theme = 'lichtung'
hasCJKLanguage = true          # 正确计算中文字数和阅读时间
enableGitInfo = true           # 显示 Git 最后修改信息
defaultContentLanguage = 'zh-cn'
```

## 分类系统

`taxonomy`是hugo的分类系统，默认有`categories`和`tags`两种分类。  
我的[个人站点](https://memex.keinmal.top)注册了 5 个 taxonomy：

```toml
[taxonomies]
tag = 'tags'
category = 'categories'
series = 'series'
topic = 'topics'
genre = 'genres'
```

每个 taxonomy 自动生成列表页（如 `/tags/`）和 term 页（如 `/tags/hugo/`）。  
本站还有整体的`layout: indexes` 作为[索引](/indexes)。

## 菜单

```toml
[menus]
# 顶栏菜单
[[menus.main]]
name = '文章'
url = '/posts'
weight = 10

# 含子菜单
[[menus.main]]
name = '分类'
identifier = 'tax'
weight = 20

[[menus.main]]
name = '标签'
parent = 'tax'
url = '/tags'
weight = 1

# 侧边栏菜单（需 ShowSiteNav = true）
[[menus.side]]
name = '链接'
url = '/links'
weight = 10
```

## 自定义输出格式

Lichtung 使用 `CROSSLINKS` 输出格式支持交叉链接功能：

```toml
[outputs]
home = ["HTML", "RSS", "JSON", "CROSSLINKS"]

[outputFormats.crosslinks]
mediaType = 'application/json'
baseName = 'crosslinks'
isPlainText = true
notAlternative = true
weight = 1
```

> **注意**：CROSSLINKS 声明在 `home` 的 output 下，而非全局 `[outputFormats]` 下。

## 内容组织

建议的目录结构：

```
content/
├── _index.md          # 首页
├── about.md           # 关于页
├── archive.md         # 归档页
├── indexes.md         # 索引页
├── posts/             # 文章
│   ├── _index.md
│   └── my-post.md
└── docs/              # 文档
    ├── _index.md
    └── usage.md
```

栏目通过 `_index.md` 的 `cascade` 统一设置其下所有页面的默认值——详见 [选项示例](/docs/option-examples/#cascade)。

## 下一步

- 查看 [主题选项](/docs/theme-options/) 了解所有可配置参数
- 查看 [选项示例](/docs/option-examples/) 了解 front matter 实际用法
