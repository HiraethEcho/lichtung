---
title: 评论系统
date: 2024-07-15
summary: Lichtung 支持四种评论系统的配置方法——CWD、Waline、Twikoo、Giscus
tags:
  - 评论
categories: guide
ai: true
ShowToc: true
---

# 评论系统

Lichtung 支持同时启用多种评论系统，用户通过标签切换。当前支持四种：

| 系统       | 部署方式             | 数据存储         |
| ---------- | -------------------- | ---------------- |
| **CWD**    | 自部署               | 自托管           |
| **Waline** | Vercel/自部署        | LeanCloud/自托管 |
| **Twikoo** | 腾讯云/Vercel/Zeabur | 腾讯云/自托管    |
| **Giscus** | GitHub Discussions   | GitHub           |

## 全局开关

```toml
[params]
comment = true
```

设为 `false` 则全站不显示评论。单篇文章可覆盖：

```yaml
---
title: 不需要评论的文章
comment: false
---
```

## 切换机制

多种评论系统同时启用时，页面底部以标签页(CSS checkbox)切换，无需 JavaScript 控制切换行为。

每个系统有独立的 `*show` 参数控制默认显示哪个标签：

```toml
walineshow = true   # Waline 标签默认选中
giscusshow = false  # Giscus 标签默认未选中
```

## CWD

[CWD](https://github.com/anghunk/cwd) 是为 Lichtung 开发的轻量自部署评论系统。

```toml
[params]
cwd = true
cwdurl = 'https://cwd.example.com'
cwdsiteid = 'your-site-id'
cwdpostslug = ''        # 留空则使用页面路径
cwdlang = 'auto'        # auto / zh-CN / en
cwdshow = true
```

| 参数          | 说明                             |
| ------------- | -------------------------------- |
| `cwd`         | 是否启用 CWD                     |
| `cwdurl`      | CWD 服务端地址                   |
| `cwdsiteid`   | 站点标识，在 CWD 后台创建        |
| `cwdpostslug` | 文章 slug 覆盖，留空使用页面路径 |
| `cwdlang`     | 语言，`auto` 自动检测            |
| `cwdshow`     | 是否默认显示此评论标签           |

## Waline

[Waline](https://waline.js.org/) 基于 LeanCloud，支持 Vercel 一键部署。

```toml
[params]
waline = true
walineserver = 'https://your-waline-server.example.com'
walineshow = true
```

| 参数           | 说明                   |
| -------------- | ---------------------- |
| `waline`       | 是否启用 Waline        |
| `walineserver` | Waline 服务端地址      |
| `walineshow`   | 是否默认显示此评论标签 |

Waline 加载时使用预设的中文 locale，已禁用 emoji 搜索、图片上传和点赞功能。

部署步骤简述：

1. 在 [LeanCloud](https://www.leancloud.cn/) 注册并创建应用
2. 使用 [Vercel](https://vercel.com/) 一键部署 Waline 服务端
3. 将 Vercel 分配的域名填入 `walineserver`

详细部署指南见 [Waline 官方文档](https://waline.js.org/guide/deploy/)。

## Twikoo

[Twikoo](https://twikoo.js.org/) 是基于腾讯云开发的评论系统。

```toml
[params]
twikoo = true
twikooenvId = 'https://twikoo.example.com'
twikoojs = 'https://cdn.example.com/twikoo.min.js'
twikooshow = true
```

| 参数          | 说明                       |
| ------------- | -------------------------- |
| `twikoo`      | 是否启用 Twikoo            |
| `twikooenvId` | 腾讯云环境 ID 或自部署地址 |
| `twikoojs`    | Twikoo JS 文件的 CDN 地址  |
| `twikooshow`  | 是否默认显示此评论标签     |

部署步骤简述：

1. 在腾讯云创建云开发环境
2. 部署 Twikoo 云函数
3. 将环境 ID 填入 `twikooenvId`

也可通过 Vercel 或 Zeabur 自部署，详见 [Twikoo 官方文档](https://twikoo.js.org/)。

## Giscus

[Giscus](https://giscus.app/) 基于 GitHub Discussions，无需自部署后端。

```toml
[params]
giscus = true
gcsdata = {
  repo = "user/repo",
  repoid = "R_kgDOxxx",
  category = "General",
  categoryid = "DIC_kwxxx",
  mapping = "title",
  position = "top",
  lang = "zh-CN"
}
giscusshow = true
```

| 参数                 | 说明                         |
| -------------------- | ---------------------------- |
| `giscus`             | 是否启用 Giscus              |
| `gcsdata.repo`       | GitHub 仓库（需公开）        |
| `gcsdata.repoid`     | 仓库 ID                      |
| `gcsdata.category`   | Discussion 分类名            |
| `gcsdata.categoryid` | 分类 ID                      |
| `gcsdata.mapping`    | 页面与 Discussion 映射方式   |
| `gcsdata.position`   | 评论框位置（`top`/`bottom`） |
| `gcsdata.lang`       | 语言                         |
| `giscusshow`         | 是否默认显示此评论标签       |

`mapping` 可选值：`pathname`、`url`、`title`、`og:title`、`specific`、`number`。

部署步骤：

1. 在 GitHub 创建公开仓库并启用 Discussions
2. 安装 [giscus app](https://github.com/apps/giscus)
3. 在 [giscus.app](https://giscus.app/) 生成配置，填入 `gcsdata`

Giscus 主题自动跟随暗色模式（`preferred_color_scheme`）。

## 推荐选择

| 场景             | 推荐       |
| ---------------- | ---------- |
| 不想自部署       | Giscus     |
| 需要完全控制数据 | CWD/Waline |
| 国内访问速度快   | Twikoo     |
| 与 GitHub 集成   | Giscus     |
| 轻量自托管       | CWD        |
