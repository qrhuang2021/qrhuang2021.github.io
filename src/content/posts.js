export const posts = [
  {
    slug: 'codex-sdk-introduction',
    title: 'Codex SDK 入门介绍',
    date: '2026-08-19',
    lang: 'zh-CN',
    language: '中文',
    summary: '从 Codex、Thread 和 Turn 的最小 mental model 出发，逐步理解 Codex SDK 的核心运行机制。',
  },
  {
    slug: 'dependency-inversion-principle',
    title: '依赖倒置原则',
    date: '2026-08-15',
    lang: 'zh-CN',
    language: '中文',
    summary: '从 runtime call 与 source code 两种方向出发，理解 Use Case、Repository abstraction、database implementation 与 composition root 之间的依赖倒置。',
  },
  {
    slug: 'web-based-user-study-system-code-architecture',
    title: 'Web-based User Study 系统的代码架构设计',
    date: '2026-08-15',
    lang: 'zh-CN',
    language: '中文',
    summary: '以 Markdown 创意写作为例，逐步设计包含 Study、Task、Workspace 和 Document 的多用户 User Study 系统。',
  },
  {
    slug: 'deep-learning-project-code-architecture',
    title: '深度学习项目的代码架构',
    date: '2026-08-14',
    lang: 'zh-CN',
    language: '中文',
    summary: '如何分离数据、模型、训练流程与实验配置，让深度学习项目可复现、可替换、可持续演进。',
  },
  {
    slug: 'deploy-personal-website-with-github',
    title: '通过 GitHub 部署个人网站',
    date: '2026-08-12',
    lang: 'zh-CN',
    language: '中文',
    summary: '理解网页访问原理，并将静态网站或 React/Vite 项目部署到 GitHub Pages。',
  },
  {
    slug: 'welcome',
    title: 'Welcome',
    date: '2026-08-12',
    lang: 'en',
    language: 'English',
    summary: 'A short introduction to this website and the notes that will live here.',
  },
]

export function findPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
