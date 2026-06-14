---
title: 选项示例
date: 2024-03-10
summary: 常用 front matter 配置模式和实战示例
tags:
  - 示例
categories: guide
ai: true
weight: 3
ShowToc: true
ShowRelPost: true
ShowForwardLink: true
ShowBackLink: true
comment: true
---

# 选项示例

本文展示 Lichtung 主题常见配置模式的实际用法。每个示例可直接复制到你的 `.md` 文件 front matter 中。

## pages

Lichtung 提供四种布局模板，通过frontmatter `layout` 字段设置。或者`content/_index.md` 默认为`home`，其他`content/about.md` 等默认为对应layout。

```yaml
# 普通文章（默认）
---
title: 我的文章
---
```

```yaml
# about 布局（显示写作热力图）
---
title: 关于
layout: about
---
```

```yaml
# archive 布局（按年月归档所有文章）
---
title: 归档
layout: archive
---
```

```yaml
# indexes 布局（搜索 + 栏目 + 分类 + 筛选器）
---
title: 索引
layout: indexes
---
```

```yaml
# home 布局（首页样式）
---
title: 首页
layout: home
---
```

### 置顶文章

设置 `weight` 让文章在列表中置顶（值越大越靠前）：

```yaml
---
title: 重要公告
weight: 10
---
```

### 不在列表中显示

文章仍可直接访问，但不出现在栏目列表页：

### 不在文件树中显示

```yaml
---
title: 系统页面
HideInFileTree: true
---
```

### 目录控制

在单篇文章中开关目录：

```yaml
---
title: 长文
ShowToc: true # 显示右侧目录
---
```

```yaml
---
title: 简短说明
ShowToc: false # 不显示目录
---
```

### 相关文章

```yaml
---
title: 关联阅读
ShowRelPost: true # 侧边栏显示相关文章推荐
---
```

### 出入链

控制侧边栏的出链和入链显示：

```yaml
---
title: 交叉链接
ShowForwardLink: true # 显示出链（本文链接到谁）
ShowBackLink: true # 显示入链（谁链接到本文）
---
```

### 评论开关

```yaml
---
title: 开放评论
comment: true
---
```

```yaml
---
title: 关闭评论
comment: false
---
```

### 数学公式

开启 MathJax 渲染：

```yaml
---
title: 数学笔记
math: true
---
```

行内公式：`$E = mc^2$`，块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 密码保护

为页面添加客户端密码保护：

```yaml
---
title: 私密笔记
password: "your-password"
---
```

> 注意：这是客户端保护，仅供轻度使用。真正的安全需结合服务端方案。

### 标记 AI 内容

AI 生成的内容不计入全站字数统计：

```yaml
---
title: AI 生成的摘要
ai: true
---
```

### 排除字数统计

摘抄、引用等内容不计入字数：

```yaml
---
title: 摘抄
CountWords: false
---
```

### RSS 控制

```yaml
---
title: 笔记
rss: false # 不在 RSS 中输出
---
```

```yaml
---
title: 长文
ShowContentinRSS: false # RSS 只输出摘要，不含全文
---
```

### 搜索控制

```yaml
---
title: 内部草稿
SearchContent: false # 不加入搜索索引
---
```

### 文章状态

可以自定义状态，没有限制用词。

```yaml
---
title: 进行中的文章
status: wip
---
```

```yaml
---
title: 已完成的文章
status: done
---
```

状态标记显示在文章标题旁的元信息区。

## section 章节

### 展示章节下文章

```yaml
---
ShowList: true
ListLimit: 10
ShowSubSection: false
---
```

### cascade 统一设置

在栏目 `_index.md` 中用 `cascade` 为其下所有页面设置默认值，无需每篇重复配置：

```yaml
# content/posts/_index.md
---
title: 文章
cascade:
  ShowToc: true
  ShowRelPost: true
  FileTreeRoot: posts
  ShowContentinRSS: true
---
```

```yaml
# content/notes/_index.md
---
title: 笔记
cascade:
  ListType: list
  FileTreeRoot: notes
  CountWords: false
  SearchContent: false
  rss: false
---
```

栏目下所有页面自动继承这些设置，单篇 front matter 仍可覆盖。

## 完整示例

综合使用多个选项的实际文章：

```yaml
---
title: 一篇完整的文章
date: 2024-05-20
summary: 这篇文章展示了多种 front matter 选项的组合用法
tags:
  - hugo
  - 教程
categories: guide
weight: 5
layout: about
ShowToc: true
ShowRelPost: true
ShowForwardLink: true
ShowBackLink: true
comment: true
math: false
ai: false
---
```
