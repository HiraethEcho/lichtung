---
title: 内容控制
date: 2024-08-01
summary: 密码保护、AI 内容标记、文章状态、置顶、字数统计控制等 front matter 功能
tags:
  - 内容
categories: guide
ai: true
ShowToc: true
---

# 内容控制

Lichtung 提供多种 front matter 字段，用于控制单篇文章的可见性、统计和展示行为。

## 密码保护

为页面添加客户端密码验证：

```yaml
---
title: 私密笔记
password: "your-password"
---
```

访问该页面时会弹出密码输入框，输入错误则返回上一页或关闭窗口。

> 注意：这是客户端保护，密码以明文存储在 HTML 中，仅供轻度使用。真正的安全需结合服务端方案。

演示：[密码保护演示](/posts/password-demo/)

## AI 内容标记

标记 AI 生成内容，使其不计入字数统计和热力图：

```yaml
---
title: AI 生成的摘要
ai: true
---
```

启用后：

- 文章元信息区域显示 "AI" 标记
- 不计入全站字数和篇数统计
- 不计入热力图数据

演示：[AI 内容标记演示](/posts/ai-generated/)

### ai 与 CountWords 的区别

| 字段                | 字数统计 | AI 标记 | 热力图 |
| ------------------- | -------- | ------- | ------ |
| `ai: true`          | 排除     | 显示    | 排除   |
| `CountWords: false` | 排除     | 不显示  | 排除   |

`CountWords` 适用于摘抄、引用等非 AI 内容，只想排除统计而不显示 AI 标记。

## 文章状态

在文章元信息区域显示状态标记，用词不限：

```yaml
---
title: 进行中
status: wip
---
```

```yaml
---
title: 早期想法
status: idea
---
```

```yaml
---
title: 基本完成
status: beta
---
```

状态标记以 `<mark>` 样式显示，自定义用词即可。

## 置顶文章

通过 `weight` 控制文章在列表中的排序，值越大越靠前：

```yaml
---
title: 重要公告
weight: 10
---
```

置顶文章在列表中以星标图标标记。

## 字数统计控制

### 全站字数排除

```yaml
---
title: 摘抄
CountWords: false
---
```

文章仍可正常访问，但不计入侧边栏的"全站 X 字 / Y 篇"统计。

### 栏目级统计

栏目页（section）顶部会显示该栏目的字数/篇数统计，由 `ShowSectionCountWords` 控制：

```toml
[params]
ShowSectionCountWords = true
```

## RSS 控制

### 排除文章

```yaml
---
title: 内部笔记
rss: false
---
```

文章不会出现在 RSS 输出中。

### 仅输出摘要

```yaml
---
title: 长文
ShowContentinRSS: false
---
```

RSS 中仅包含摘要而非全文（全局默认为包含全文）。

RSS 还支持在 `hugo.toml` 中设置 `RSSLimit` 控制输出条目数。

## 搜索控制

```yaml
---
title: 内部草稿
SearchContent: false
---
```

文章不会出现在搜索索引中。详见[搜索功能](/docs/search/)。

## 文件树隐藏

在侧边栏文件树中隐藏特定页面：

```yaml
---
title: 系统页面
HideInFileTree: true
---
```

页面仍可正常访问，只是不出现在文件树导航中。

## 版权协议

每篇文章可单独指定版权协议：

```yaml
---
title: 原创文章
copyright: by-nc-nd
---
```

未指定时使用 `hugo.toml` 中的全局设置（默认 `nc-sa`，即 CC BY-NC-SA 4.0）。常见的版权后缀：

| 值         | 协议                    |
| ---------- | ----------------------- |
| `by`       | CC BY 4.0               |
| `by-sa`    | CC BY-SA 4.0            |
| `by-nc`    | CC BY-NC 4.0            |
| `nc-sa`    | CC BY-NC-SA 4.0（默认） |
| `by-nd`    | CC BY-ND 4.0            |
| `by-nc-nd` | CC BY-NC-ND 4.0         |

## Git 修改历史

当 `hugo.toml` 中配置了 `enableGitInfo = true` 和 `LastChangeLink` 时，文章底部会显示最后修改日期，并链接到对应的 Git commit：

```toml
enableGitInfo = true

[params]
LastChangeLink = 'https://github.com/user/repo/commit'
```

修改信息格式为"于 YYYY/MM/DD 修改"，点击跳转到 commit 页面。
