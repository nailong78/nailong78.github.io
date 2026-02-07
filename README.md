# nailong78.github.io
nailong's Blog

## 博客介绍
这是一个使用 GitHub Pages 搭建的个人博客，采用了 iOS 26 液态玻璃风格设计。

## 技术栈
- HTML5
- CSS3
- JavaScript

## 功能特点
- ✅ iOS 26 液态玻璃风格设计
- ✅ 完整的响应式布局
- ✅ 暗黑模式支持
- ✅ 平滑滚动效果
- ✅ 卡片动画效果
- ✅ 完整的文章样式支持
- ✅ 导航菜单功能

## 目录结构
```
nailong78.github.io/
├── css/
│   └── style.css          # 主样式文件
├── js/
│   └── script.js          # 主脚本文件
├── index.html             # 首页
├── article.html           # 示例文章页面
└── README.md              # 说明文件
```

## 如何使用
1. 将本仓库克隆到本地
2. 修改 `index.html` 中的博客标题和描述
3. 在 `css/style.css` 中自定义颜色和样式
4. 创建新的文章页面（参考 `article.html` 的结构）
5. 将更改推送到 GitHub
6. 访问 `https://yourusername.github.io` 查看博客

## 自定义指南

### 修改主题颜色
在 `css/style.css` 文件中修改以下变量：
```css
:root {
    --primary-color: #007AFF;
    --background-color: #F2F2F7;
    --card-background: rgba(255, 255, 255, 0.7);
    --text-primary: #000000;
    --text-secondary: #8E8E93;
    --border-radius: 16px;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

### 添加新文章
1. 复制 `article.html` 文件并重命名
2. 修改文章标题、内容和元数据
3. 在 `index.html` 中添加指向新文章的链接

### 响应式设计
博客已经实现了响应式设计，在不同设备上都能良好显示：
- 桌面端：多列布局
- 平板端：双列布局
- 移动端：单列布局

## 浏览器支持
- Safari
- Chrome
- Firefox
- Edge

## 许可证
MIT License
