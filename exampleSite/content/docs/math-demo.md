---
title: 数学公式展示
date: 2024-06-15
summary: 展示 MathJax 数学公式渲染功能
tags:
  - math
categories: 教程
series: example
math: true
---

# 数学公式展示

使用 `math: true` 启用 MathJax 渲染。

## 行内公式

爱因斯坦的质能方程 $E = mc^2$ 是物理学中最著名的公式。

二次方程求根公式：$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

欧拉公式：$e^{i\pi} + 1 = 0$

## 块级公式

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

$$
\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e
$$

泰勒展开：

$$
\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n}{(2n+1)!} x^{2n+1}
$$

## 矩阵

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$$
