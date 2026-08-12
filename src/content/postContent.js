const postLoaders = import.meta.glob('./blog/*.md', {
  import: 'default',
  query: '?raw',
})

export async function loadPostContent(slug) {
  const load = postLoaders[`./blog/${slug}.md`]
  return load ? load() : null
}
