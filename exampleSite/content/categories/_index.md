---
title: 类别
summary: 按分类浏览所有文章
---

在`content/categories`目录下的每个markdown文件都会被当作一个类别来处理，文件名（不带扩展名）即为类别名称（term）。比如`content/categories/tech.md`会被当作一个名为`tech`的类别。  
在各个层级用`title`可以自定义类别名称，`summary`可以自定义类别简介。

tags 和 categories 是 hugo 默认支持的两种分类（taxonomy）方式，标签和类别。在 `hugo.toml`中不声明也可用。
