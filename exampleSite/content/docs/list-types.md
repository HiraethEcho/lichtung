---
title: 章节列表样式
date: 2024-06-01
summary: 展示 Lichtung 主题四种文章列表样式及其差异
tags:
  - 列表
categories: guide
ai: true
ListType: plain
---

# 列表样式展示

Lichtung 支持四种文章列表样式，通过 `ListType` 参数控制。

## 四种样式

| 值      | 效果                                     |
| ------- | ---------------------------------------- |
| `plain` | 文章卡片列表，显示标题、日期、摘要、标签 |
| `date`  | 按年月分组归档风格，附带年份快速导航     |
| `list`  | 极简列表，只显示标题和日期               |
| `split` | 分页显示，底部分页导航                   |

## 设置方法

### 全局设置

在 `hugo.toml` 的 `[params]` 中：

```toml
ListType = 'date'
```

### 单页覆盖

在任意页面的 front matter 中：

```yaml
---
ListType: split
ListLimit: 5 # 每页显示 5 篇文章
---
```

### 栏目级统一设置

使用 cascade 为整个栏目设置：

```yaml
# content/posts/_index.md
---
cascade:
  ListType: list
---
```

## date 样式的子选项

当 `ListType = 'date'` 时，可以启用以下子选项：

| 参数                     | 说明                 |
| ------------------------ | -------------------- |
| `ShowCountWordsPerYear`  | 每年旁显示字数和篇数 |
| `ShowCountWordsPerMonth` | 每月旁显示字数和篇数 |
| `ShowPostsPerYear`       | 每年旁显示篇数       |
| `ShowPostsPerMonth`      | 每月旁显示篇数       |

## 试试看

在浏览器中打开以下页面，可以看到不同列表样式的效果：

- [文章列表（plain）](/posts/) — 卡片式
- [归档页面（date）](/archive/) — 按年月分组
- 访问[索引页](/indexes/)体验筛选功能
