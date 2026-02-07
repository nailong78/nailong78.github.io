---
title: "GitHub Pages 博客搭建指南"
date: "2026-02-07"
author: "nailong"
description: "本文详细介绍了如何使用 GitHub Pages 搭建个人博客，以及如何实现 iOS 26 液态玻璃风格的设计。"
---

# GitHub Pages 博客搭建指南

## 什么是 GitHub Pages？

GitHub Pages 是 GitHub 提供的静态网站托管服务，允许你直接从 GitHub 仓库托管静态网站。它支持 HTML、CSS 和 JavaScript 文件，非常适合搭建个人博客、项目文档或作品集。

## 为什么选择 GitHub Pages？

- 免费托管，无需支付服务器费用
- 与 GitHub 无缝集成，支持版本控制
- 支持自定义域名
- 无需配置服务器，简单易用

## 搭建步骤

搭建 GitHub Pages 博客的基本步骤如下：

1. 在 GitHub 上创建一个新仓库，命名为 `username.github.io`（其中 username 是你的 GitHub 用户名）
2. 克隆仓库到本地
3. 创建基本的 HTML、CSS 和 JavaScript 文件
4. 实现你喜欢的设计风格
5. 提交并推送更改到 GitHub
6. 访问 `https://username.github.io` 查看你的博客

## iOS 26 液态玻璃风格

iOS 26 液态玻璃风格的主要特点包括：

> 液态玻璃风格是 iOS 26 中引入的一种设计语言，它结合了半透明效果、模糊背景和微妙的动画，创造出一种轻盈、现代的视觉体验。

要实现这种风格，我们需要使用以下 CSS 技术：

```css
/* 玻璃效果 */
.glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

## 响应式设计

为了确保博客在不同设备上都能良好显示，我们需要实现响应式设计：

```css
/* 响应式设计 */
@media (max-width: 768px) {
    .navbar {
        padding: 1rem;
    }
    
    .posts {
        grid-template-columns: 1fr;
    }
    
    .article {
        padding: 2rem;
    }
}
```

## 添加文章

要添加新文章，你可以按照以下步骤操作：

1. 在 `posts/` 目录中创建一个新的 Markdown 文件
2. 在文件开头添加 YAML 前置元数据（标题、日期、作者、描述等）
3. 编写文章内容，使用 Markdown 格式
4. 提交并推送更改到 GitHub
5. 刷新博客首页，新文章会自动显示

## 结论

通过本文的指南，你应该已经了解了如何使用 GitHub Pages 搭建个人博客，并实现了 iOS 26 液态玻璃风格的设计。这种设计风格不仅美观现代，而且能够为你的博客带来独特的视觉体验。

希望本文对你有所帮助！如果你有任何问题或建议，欢迎在评论区留言。