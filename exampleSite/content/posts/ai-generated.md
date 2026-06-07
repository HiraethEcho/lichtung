---
title: AI 内容标记演示
date: 2024-08-01
summary: "展示如何用 ai: true 标记 AI 生成内容，使其不计入全站字数统计"
ai: true
tags:
  - AI
categories: guide
---

# AI 内容标记演示

本篇文章的 front matter 中设置了 `ai: true`，因此**不会计入全站字数统计**。

## 如何使用

```yaml
---
ai: true
---
```

设置后，Hugo 在计算全站文字和栏目文字时，会跳过此页面。

## 相关设置

与 `ai: true` 类似，还有一个 `CountWords` 字段：

```yaml
---
CountWords: false # 不计入字数（但不改变 ai 标记）
---
```

这两个字段的区别：

| 字段                | 字数统计 | AI 标记显示 |
| ------------------- | -------- | ----------- |
| `ai: true`          | 排除     | ✅ 显示     |
| `CountWords: false` | 排除     | ❌ 不显示   |

`ai: true` 会在页面元信息区域显示"🤖 AI"标记。

## 适用场景

- 明确标注 AI 辅助生成的内容
- 摘抄/引用内容不希望影响全站统计
- 自动生成的列表或汇总页面
