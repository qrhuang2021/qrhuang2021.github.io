export const posts = [
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
