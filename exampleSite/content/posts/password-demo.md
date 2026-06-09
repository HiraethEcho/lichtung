---
title: 密码保护演示
date: 2024-07-01
summary: 这是一篇受密码保护的文章，展示 Lichtung 主题的密码保护功能。密码为 demo
password: demo
ai: true
tags:
  - 密码
categories: example
---

# 密码保护演示

内容可见说明密码输入正确。

## 如何使用

在 front matter 中设置 `password` 字段即可为文章添加密码保护：

```yaml
---
password: "your-password"
---
```

访问页面时会弹出 JavaScript 密码提示框。输入错误则返回上一页或关闭窗口。

> **注意**：这是客户端保护，仅供轻度私密用途。真正的安全保护需结合服务器端方案。

## 适用场景

- 草稿分享给特定读者预览
- 私人日记
- 不希望在搜索引擎中被索引的页面

## 提示

当前页面密码是 `demo`。试试修改 `password` 字段的值，重新输入看看效果。
