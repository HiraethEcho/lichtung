---
title: 出入链功能演示
date: 2024-09-01
summary: 详细说明 Lichtung 的交叉链接功能——自动追踪文章间的出链和入链
tags:
  - 交叉链接
categories: example
ai: true
ShowForwardLink: true
ShowBackLink: true
---

# 出入链功能演示

交叉链接（Crosslinks）是 Lichtung 的特色功能，自动追踪站点内部页面之间的链接关系。

## 出链和入链

- **出链**：本篇文章链接到的其他本站页面（Forward links）
- **入链**：其他页面中链接到本篇文章的链接（Back links）

请查看右侧边栏，你会看到本页面链接到其他页面的列表（出链），以及其他页面指向本页面的列表（入链）。

## 下面是一些内部链接——用于演示出链功能

这些链接会被自动追踪：

- [Markdown 功能展示](/docs/markdown-showcase/)
- [使用与安装](/docs/usage-setup/)
- [选项示例](/docs/option-examples/)
- [CJK 文字示例](/docs/cjk-demo/)
- [数学公式展示](/docs/math-demo/)
- [常见谬误](/docs/subsection/fallacy/)

```
- [Markdown 功能展示](/docs/markdown-showcase/)
- [使用与安装](/docs/usage-setup/)
- [选项示例](/docs/option-examples/)
- [CJK 文字示例](/docs/cjk-demo/)
- [数学公式展示](/docs/math-demo/)
- [常见谬误](/docs/subsection/fallacy/)
```

## 实现原理

1. **构建时**：`render-link.crosslinks.json` 钩子在渲染页面时遍历所有内部链接，记录源页面和目标页面的映射关系
2. **存储**：通过 Hugo Scratch 在构建过程中累积数据
3. **输出**：CROSSLINKS 输出格式生成 JSON 文件
4. **渲染**：`post-fb.html` 部分读取数据，筛选出当前页面的出链和入链

## 配置

```toml
[params]
ShowForwardLink = true   # 显示出链
ShowBackLink = true      # 显示入链
```

也可以在单篇文章的 front matter 中覆盖：

```yaml
---
ShowForwardLink: false
ShowBackLink: false
---
```

## 注意事项

- 只有内部链接（以 `/` 开头的路径）会被追踪
- 外部链接（`https://...`）不会记录到交叉链接中
- 需要在 `hugo.toml` 中启用 CROSSLINKS 输出格式：

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

## 查看交叉链接数据

构建站点后，可在根目录找到 `/crosslinks.json` 文件，其中包含所有页面间的链接映射。
