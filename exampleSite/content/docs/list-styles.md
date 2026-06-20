---
title: 章节列表样式
date: 2024-06-01
summary: 展示 Lichtung 主题文章列表的 liststyle 与 itemstyle 选项
tags:
  - 列表
categories: guide
ai: true
ListStyle: list
ItemStyle: card
---

# 列表样式展示

Lichtung 的文章列表由两个互相独立的选项控制：

- **`ListStyle`** 决定列表如何**组织**（平铺 / 按年月分组 / 分页）。
- **`ItemStyle`** 决定列表中每一项如何**渲染**（卡片 / 极简）。

## ListStyle

| 值      | 效果                                             |
| ------- | ------------------------------------------------ |
| `list`  | 平铺列表，逐条渲染所有文章                       |
| `date`  | 按年月分组（归档风格），年份侧边栏快速导航       |
| `split` | 平铺列表 + 分页，底部带分页导航                  |

## ItemStyle

`ItemStyle` 对所有 `ListStyle` 都生效。

| 值       | 效果                                       |
| -------- | ------------------------------------------ |
| `card`   | 文章卡片，显示标题、日期、标签等 meta 信息 |
| `simple` | 极简条目，仅标题链接 + 日期 + 摘要         |

> 例如 `ListStyle = date` + `ItemStyle = simple` 会得到「按年月分组、每月下面是紧凑的标题列表」。

## 设置方法

### 全局设置

在 `hugo.toml` 的 `[params]` 中：

```toml
ListStyle = 'date'
ItemStyle = 'card'
```

### 单页覆盖

在任意页面的 front matter 中：

```yaml
---
ListStyle: split
ItemStyle: simple
ListLimit: 5 # 每页显示 5 篇文章
---
```

## date 样式的子选项

当 `ListStyle = date` 时，可以启用以下子选项：

| 参数                     | 说明                 |
| ------------------------ | -------------------- |
| `ShowCountWordsPerYear`  | 每年旁显示字数和篇数 |
| `ShowCountWordsPerMonth` | 每月旁显示字数和篇数 |
| `ShowPostsPerYear`       | 每年旁显示篇数       |
| `ShowPostsPerMonth`      | 每月旁显示篇数       |

## 示例

- [文章列表（list + card）](/posts/) — 卡片式
- [归档页面（date + simple）](/archive/) — 按年月分组
- 访问[索引页](/indexes/)体验筛选功能
