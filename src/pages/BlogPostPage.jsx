import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MarkdownArticle from '../components/MarkdownArticle.jsx'
import { loadPostContent } from '../content/postContent.js'
import { findPostBySlug } from '../content/posts.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { formatPostDate } from '../lib/formatPostDate.js'

function BlogPostPage() {
  const { slug } = useParams()
  const post = findPostBySlug(slug)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(Boolean(post))

  useDocumentTitle(post?.title ?? 'Article not found')

  useEffect(() => {
    let active = true

    if (!post) {
      return undefined
    }

    setContent(null)
    setLoading(true)

    loadPostContent(post.slug).then((body) => {
      if (active) {
        setContent(body)
        setLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [post])

  if (!post) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-5xl px-6 py-20 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-academic-600">
          Not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-academic-900">
          Article not found
        </h1>
        <Link className="mt-6 inline-flex font-semibold text-academic-700 hover:underline" to="/blog">
          ← Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <article className="mx-auto min-h-[70vh] max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
      <Link className="text-sm font-semibold text-academic-700 hover:underline" to="/blog">
        ← Back to Blog
      </Link>

      <header className="mt-10 max-w-3xl border-b border-slate-200 pb-10">
        <time className="text-sm text-slate-500" dateTime={post.date}>
          {formatPostDate(post.date)}
        </time>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-academic-900 sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{post.summary}</p>
      </header>

      <div className="pt-8">
        {loading ? <p className="text-slate-500">Loading article…</p> : null}
        {!loading && content ? <MarkdownArticle>{content}</MarkdownArticle> : null}
        {!loading && !content ? (
          <p className="text-slate-500">Article content is unavailable.</p>
        ) : null}
      </div>
    </article>
  )
}

export default BlogPostPage
