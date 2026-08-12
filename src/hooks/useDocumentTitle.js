import { useEffect } from 'react'
import { profile } from '../content/profile.js'

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${profile.name}` : profile.name
  }, [pageTitle])
}
