// Markdown解析器
class MarkdownParser {
    constructor() {
        this.rules = [
            // 标题
            { regex: /^# (.*$)/gm, replacement: '<h1>$1</h1>' },
            { regex: /^## (.*$)/gm, replacement: '<h2>$1</h2>' },
            { regex: /^### (.*$)/gm, replacement: '<h3>$1</h3>' },
            
            // 粗体和斜体
            { regex: /\*\*(.*)\*\*/g, replacement: '<strong>$1</strong>' },
            { regex: /\*(.*)\*/g, replacement: '<em>$1</em>' },
            
            // 链接
            { regex: /\[([^\]]+)\]\(([^\)]+)\)/g, replacement: '<a href="$2">$1</a>' },
            
            // 图片
            { regex: /!\[([^\]]*)\]\(([^\)]+)\)/g, replacement: '<img src="$2" alt="$1">' },
            
            // 代码块
            { regex: /```([\s\S]*?)```/g, replacement: '<pre><code>$1</code></pre>' },
            
            // 行内代码
            { regex: /`(.*?)`/g, replacement: '<code>$1</code>' },
            
            // 引用
            { regex: /^>(.*$)/gm, replacement: '<blockquote>$1</blockquote>' },
            
            // 无序列表
            { regex: /^\* (.*$)/gm, replacement: '<li>$1</li>' },
            { regex: /(<li>.*<\/li>)/gs, replacement: '<ul>$1</ul>' },
            
            // 有序列表
            { regex: /^\d+\. (.*$)/gm, replacement: '<li>$1</li>' },
            { regex: /(<li>.*<\/li>)/gs, replacement: '<ol>$1</ol>' },
            
            // 段落
            { regex: /^(?!<h[1-6]>)(?!<ul>)(?!<ol>)(?!<li>)(?!<blockquote>)(?!<pre>)(.*$)/gm, replacement: '<p>$1</p>' }
        ];
    }

    // 解析YAML前置元数据
    parseFrontMatter(content) {
        const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
        const match = content.match(frontMatterRegex);
        
        if (match) {
            const frontMatter = match[1];
            const contentWithoutFrontMatter = content.replace(frontMatterRegex, '');
            
            const metadata = {};
            frontMatter.split('\n').forEach(line => {
                const [key, value] = line.split(':').map(item => item.trim());
                if (key && value) {
                    metadata[key] = value.replace(/^"|"$/g, '');
                }
            });
            
            return { metadata, content: contentWithoutFrontMatter };
        }
        
        return { metadata: {}, content };
    }

    // 解析Markdown为HTML
    parse(markdown) {
        let html = markdown;
        
        this.rules.forEach(rule => {
            html = html.replace(rule.regex, rule.replacement);
        });
        
        return html;
    }
}

// 文章管理器
class PostManager {
    constructor() {
        this.parser = new MarkdownParser();
        this.repoOwner = 'nailong78';
        this.repoName = 'nailong78.github.io';
        this.apiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/contents/posts`;
    }

    // 获取posts目录中的所有文件
    async getPosts() {
        try {
            const response = await fetch(this.apiUrl);
            const files = await response.json();
            
            const posts = [];
            
            for (const file of files) {
                if (file.name.endsWith('.md')) {
                    const postContent = await this.getPostContent(file.download_url);
                    posts.push(postContent);
                }
            }
            
            // 按日期排序，最新的在前
            posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
            
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    // 获取单个文章的内容
    async getPostContent(url) {
        try {
            const response = await fetch(url);
            const content = await response.text();
            const { metadata, content: markdownContent } = this.parser.parseFrontMatter(content);
            const htmlContent = this.parser.parse(markdownContent);
            
            return {
                metadata,
                html: htmlContent,
                markdown: content
            };
        } catch (error) {
            console.error('Error fetching post content:', error);
            return null;
        }
    }

    // 获取单个文章（根据文件名）
    async getPostBySlug(slug) {
        try {
            const posts = await this.getPosts();
            return posts.find(post => {
                const fileName = post.metadata.title.toLowerCase().replace(/\s+/g, '-') + '.md';
                return fileName === slug + '.md';
            });
        } catch (error) {
            console.error('Error fetching post by slug:', error);
            return null;
        }
    }

    // 生成文章列表HTML
    generatePostListHTML(posts) {
        if (posts.length === 0) {
            return '<p>暂无文章</p>';
        }
        
        return posts.map(post => {
            const slug = post.metadata.title.toLowerCase().replace(/\s+/g, '-');
            return `
                <article class="post-card">
                    <h3><a href="post.html?slug=${slug}">${post.metadata.title}</a></h3>
                    <p class="post-meta">发布于 ${post.metadata.date} · ${post.metadata.author}</p>
                    <p class="post-excerpt">${post.metadata.description}</p>
                    <a href="post.html?slug=${slug}" class="read-more">阅读更多</a>
                </article>
            `;
        }).join('');
    }

    // 生成文章详情HTML
    generatePostHTML(post) {
        if (!post) {
            return '<p>文章不存在</p>';
        }
        
        return `
            <article class="article">
                <h1>${post.metadata.title}</h1>
                <div class="article-meta">
                    <p>发布于 ${post.metadata.date} · ${post.metadata.author}</p>
                </div>
                <div class="article-content">
                    ${post.html}
                </div>
            </article>
        `;
    }
}

// 初始化函数
async function initBlog() {
    const postManager = new PostManager();
    
    // 首页文章列表
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const posts = await postManager.getPosts();
        const postsContainer = document.querySelector('.posts');
        if (postsContainer) {
            postsContainer.innerHTML = postManager.generatePostListHTML(posts);
        }
    }
    
    // 文章详情页
    if (window.location.pathname.endsWith('post.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');
        
        if (slug) {
            const post = await postManager.getPostBySlug(slug);
            const postContainer = document.querySelector('.post-container');
            if (postContainer) {
                postContainer.innerHTML = postManager.generatePostHTML(post);
            }
        }
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarkdownParser, PostManager, initBlog };
} else {
    window.MarkdownParser = MarkdownParser;
    window.PostManager = PostManager;
    window.initBlog = initBlog;
}