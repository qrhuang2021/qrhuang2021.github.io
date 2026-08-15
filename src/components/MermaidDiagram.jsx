import { useEffect, useId, useState } from 'react'

let mermaidLoader
let renderQueue = Promise.resolve()

function loadMermaid() {
  if (!mermaidLoader) {
    mermaidLoader = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        securityLevel: 'strict',
        startOnLoad: false,
        theme: 'neutral',
      })

      return mermaid
    })
  }

  return mermaidLoader
}

function renderMermaid(id, source) {
  const queuedRequest = renderQueue.then(async () => {
    const mermaid = await loadMermaid()
    await mermaid.parse(source)
    return mermaid.render(id, source)
  })

  renderQueue = queuedRequest.catch(() => undefined)
  return queuedRequest
}

function MermaidDiagram({ chart }) {
  const reactId = useId()
  const diagramId = `mermaid-${reactId.replaceAll(':', '')}`
  const [svg, setSvg] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true

    setSvg('')
    setFailed(false)

    renderMermaid(diagramId, chart.trim())
      .then((result) => {
        if (active) {
          setSvg(result.svg)
        }
      })
      .catch(() => {
        if (active) {
          setFailed(true)
        }
      })

    return () => {
      active = false
    }
  }, [chart, diagramId])

  if (failed) {
    return (
      <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="mb-3 text-sm font-medium text-red-800">Mermaid diagram could not be rendered.</p>
        <pre className="max-w-full overflow-x-auto text-xs leading-5 text-slate-700">
          <code>{chart}</code>
        </pre>
      </div>
    )
  }

  if (!svg) {
    return (
      <div className="my-6 min-h-40 animate-pulse rounded-xl border border-academic-100 bg-academic-50" />
    )
  }

  return (
    <div
      aria-label="Mermaid diagram"
      className="my-8 max-w-full overflow-x-auto rounded-xl border border-academic-100 bg-white p-4 sm:p-6 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
    />
  )
}

export default MermaidDiagram
