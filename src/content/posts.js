export const posts = [
  {
    slug: 'deploy-personal-website-with-github',
    title: '通过 GitHub 部署个人网站',
    date: '2026-08-12',
    summary: '',
  },
  {
    slug: 'welcome',
    title: 'Welcome',
    date: '2026-08-12',
    summary: 'A short introduction to this website and the notes that will live here.',
  },
]

export function findPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
