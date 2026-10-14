import { useEffect, useRef, useSyncExternalStore } from 'react'

// A tiny router, enough for a handful of pages.
// Served over http(s) it uses clean paths (/faq). Opened from disk (the single-file build,
// file://) there is no server to answer /faq, so routes live in the hash instead (#/faq).
// A plain fragment such as #history always means "the home page, at that section".
const HASH_MODE = typeof window !== 'undefined' && window.location.protocol === 'file:'

function readPath() {
  if (HASH_MODE) {
    const h = window.location.hash
    return h.startsWith('#/') ? h.slice(1).replace(/\/+$/, '') || '/' : '/'
  }
  return window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/'
}

const listeners = new Set()
const emit = () => listeners.forEach((l) => l())
function subscribe(l) {
  listeners.add(l)
  window.addEventListener('popstate', l)
  window.addEventListener('hashchange', l)
  return () => {
    listeners.delete(l)
    window.removeEventListener('popstate', l)
    window.removeEventListener('hashchange', l)
  }
}

/** The current route path, e.g. "/" or "/faq". */
export function usePath() {
  return useSyncExternalStore(subscribe, readPath, () => '/')
}

/** "/faq" or "/#history" → the href that works in the current mode. */
export function toHref(to) {
  if (!HASH_MODE) return to
  const [path = '/', frag] = to.split('#')
  if (path === '/' || path === '') return frag ? `#${frag}` : '#/'
  return `#${path}` // the hash can hold a route or a fragment, not both
}

export function navigate(to) {
  const href = toHref(to)
  if (HASH_MODE) window.location.hash = href.slice(1)
  else window.history.pushState(null, '', href)
  emit()
}

/** An anchor that changes page without a reload. Same-page fragment links stay native. */
export function Link({ to, onClick, children, ...rest }) {
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const [path] = to.split('#')
    if ((path || '/') === readPath()) return // let the browser scroll to the fragment
    e.preventDefault()
    navigate(to)
  }
  return (
    <a href={toHref(to)} onClick={handle} {...rest}>
      {children}
    </a>
  )
}

/** Scroll to an element on the current page without touching the URL (safe in hash mode). */
export function jumpTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** On every page change: land on the requested section, or at the top. */
export function useScrollOnRouteChange(path) {
  const first = useRef(true)
  useEffect(() => {
    const frag = window.location.hash.slice(1)
    const el = frag && !frag.startsWith('/') ? document.getElementById(decodeURIComponent(frag)) : null
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
    else if (!first.current) window.scrollTo({ top: 0, behavior: 'instant' }) // keep the browser's restore on reload
    first.current = false
  }, [path])
}

/** Sets the tab title for a page. */
export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · سلالة تيسمسيلت` : 'سلالة تيسمسيلت'
  }, [title])
}
