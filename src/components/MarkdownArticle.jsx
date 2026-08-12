import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MarkdownHeadingTwo({ children }) {
  return (
    <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-academic-900 first:mt-0">
      {children}
    </h2>
  )
}

function MarkdownHeadingThree({ children }) {
  return (
    <h3 className="mb-3 mt-8 text-xl font-semibold text-slate-900">
      {children}
    </h3>
  )
}

function MarkdownParagraph({ children }) {
  return <p className="my-5 leading-8 text-slate-700">{children}</p>
}

function MarkdownLink({ children, href }) {
  const external = href?.startsWith('http')

  return (
    <a
      className="font-medium text-academic-700 underline decoration-academic-200 transition-colors hover:decoration-academic-700"
      href={href}
      rel={external ? 'noreferrer' : undefined}
      target={external ? '_blank' : undefined}
    >
      {children}
    </a>
  )
}

function MarkdownUnorderedList({ children }) {
  return <ul className="my-5 list-disc space-y-2 pl-6 leading-7">{children}</ul>
}

function MarkdownOrderedList({ children }) {
  return <ol className="my-5 list-decimal space-y-2 pl-6 leading-7">{children}</ol>
}

function MarkdownBlockquote({ children }) {
  return (
    <blockquote className="my-6 border-l-4 border-academic-200 bg-academic-50 px-5 py-1 text-slate-600">
      {children}
    </blockquote>
  )
}

function MarkdownCode({ children }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800">
      {children}
    </code>
  )
}

function MarkdownImage({ alt, src }) {
  return (
    <img
      alt={alt ?? ''}
      className="my-8 h-auto max-w-full rounded-xl border border-slate-200"
      loading="lazy"
      src={src}
    />
  )
}

function MarkdownPreformatted({ children }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-xl border border-academic-200 bg-academic-50 p-5 text-sm leading-6 text-academic-900 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  )
}

const markdownComponents = {
  a: MarkdownLink,
  blockquote: MarkdownBlockquote,
  code: MarkdownCode,
  h2: MarkdownHeadingTwo,
  h3: MarkdownHeadingThree,
  img: MarkdownImage,
  ol: MarkdownOrderedList,
  p: MarkdownParagraph,
  pre: MarkdownPreformatted,
  ul: MarkdownUnorderedList,
}

const markdownPlugins = [remarkGfm]

function MarkdownArticle({ children }) {
  return (
    <div className="max-w-3xl">
      <ReactMarkdown components={markdownComponents} remarkPlugins={markdownPlugins}>
        {children}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownArticle
