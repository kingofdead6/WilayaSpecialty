import { useId, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CONTACT, FAQ } from '../data'
import { jumpTo, useTitle } from '../router'
import PageHeader from '../components/PageHeader'
import { Reveal, ease } from '../components/ui'

// Search ignores harakat and the usual spelling variants (أ/إ/آ, ة/ه, ى/ي).
const norm = (s) =>
  s
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .toLowerCase()

/** Wraps the matched words in <mark>. Works on the normalised text, which keeps the same length. */
function Highlight({ text, query }) {
  const q = norm(query.trim())
  if (!q) return text
  const n = norm(text)
  if (n.length !== text.length) return text
  const out = []
  let i = 0
  for (let at = n.indexOf(q); at !== -1; at = n.indexOf(q, i)) {
    if (at > i) out.push(text.slice(i, at))
    out.push(
      <mark key={at} className="rounded-[2px] bg-straw-deep/45 px-0.5 text-inherit">
        {text.slice(at, at + q.length)}
      </mark>,
    )
    i = at + q.length
  }
  out.push(text.slice(i))
  return out
}

function Item({ item, query, open, onToggle }) {
  const id = useId()
  return (
    <li className="border-b border-bark/15">
      <h3 className="text-[clamp(1.1rem,1.8vw,1.3rem)] font-semibold">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-6 text-start"
        >
          <span className="transition-colors group-hover:text-rust">
            <Highlight text={item.q} query={query} />
          </span>
          <span
            className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
              open ? 'border-bark bg-bark text-straw' : 'border-bark/25 group-hover:border-bark'
            }`}
            aria-hidden="true"
          >
            <span className="absolute h-[2px] w-3.5 rounded bg-current" />
            <span
              className={`absolute h-3.5 w-[2px] rounded bg-current transition-transform duration-300 ${open ? 'scale-y-0' : ''}`}
            />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <p className="max-w-[44rem] border-s-2 border-straw-deep pb-7 ps-5 text-bark/85">
              <Highlight text={item.a} query={query} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Faq() {
  useTitle('الأسئلة الشائعة')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(() => new Set(['craft-0']))

  const groups = useMemo(() => {
    const q = norm(query.trim())
    return FAQ.map((g) => ({
      ...g,
      items: g.items
        .map((it, i) => ({ ...it, key: `${g.id}-${i}` }))
        .filter((it) => !q || norm(it.q).includes(q) || norm(it.a).includes(q)),
    })).filter((g) => g.items.length)
  }, [query])

  const total = groups.reduce((n, g) => n + g.items.length, 0)
  const searching = query.trim().length > 0
  const toggle = (key) =>
    setOpen((s) => {
      const next = new Set(s)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  return (
    <>
      <PageHeader eyebrow="الأسئلة الشائعة" title="الأسئلة الشائعة">
        كل ما يُسأل عنه كثيرا حول حرفة السلالة، ومادة الدوم، وعلامة «سلالة تيسمسيلت».
      </PageHeader>

      <div className="fibre bg-paper">
        <div className="gutter mx-auto grid max-w-7xl gap-14 py-20 lg:grid-cols-[17rem_1fr] lg:gap-20 lg:py-28">
          <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold text-rust">المحاور</p>
            <ul className="mt-4 grid gap-1">
              {FAQ.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#faq-${g.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      jumpTo(`faq-${g.id}`)
                    }}
                    className="flex items-center justify-between gap-3 rounded-[3px] px-3 py-2 transition-colors hover:bg-straw/60"
                  >
                    <span>{g.title}</span>
                    <span className="font-latin text-sm text-bark/50">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10 hidden rounded-[4px] bg-bark p-6 text-straw lg:block">
              <p className="font-display text-xl">لم تجد جوابك؟</p>
              <p className="mt-2 text-[15px] text-straw/75">راسل الغرفة مباشرة عبر البريد الإلكتروني.</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-5 inline-block rounded-full bg-straw px-5 py-2 text-[15px] font-bold text-bark-deep transition-transform hover:-translate-y-0.5"
              >
                راسلنا
              </a>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                ابحث في الأسئلة
              </label>
              <svg
                className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-bark/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث: الدوم، السبتة، الشعار…"
                className="w-full rounded-full border border-bark/20 bg-white/60 py-4 pe-14 ps-14 text-lg outline-none transition-[border-color,background-color,box-shadow] placeholder:text-bark/40 focus:border-bark focus:bg-white focus:shadow-[0_0_0_4px_rgb(196_164_111/0.35)]"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      document.getElementById('faq-search')?.focus()
                    }}
                    aria-label="مسح البحث"
                    className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-bark/60 transition-colors hover:bg-bark hover:text-straw"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-3 h-6 text-sm text-bark/60" aria-live="polite">
              {searching && (total ? `${total} نتيجة` : '')}
            </p>

            {groups.map((g) => (
              <section key={g.id} id={`faq-${g.id}`} className="mt-16 scroll-mt-24 first-of-type:mt-6">
                <Reveal>
                  <h2 className="flex items-center gap-4 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold">
                    {g.title}
                    <span className="h-px flex-1 bg-bark/15" aria-hidden="true" />
                  </h2>
                </Reveal>
                <ul className="mt-4">
                  {g.items.map((it) => (
                    <Item
                      key={it.key}
                      item={it}
                      query={query}
                      open={searching || open.has(it.key)}
                      onToggle={() => toggle(it.key)}
                    />
                  ))}
                </ul>
              </section>
            ))}

            {!total && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 rounded-[4px] border border-dashed border-bark/25 p-10 text-center"
              >
                <p className="font-display text-2xl">لا توجد نتائج لـ «{query.trim()}»</p>
                <p className="mt-2 text-bark/70">جرّب كلمة أخرى، أو راسل الغرفة مباشرة.</p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-6 rounded-full border border-bark/30 px-5 py-2 text-[15px] font-bold transition-colors hover:bg-bark hover:text-straw"
                >
                  مسح البحث
                </button>
              </motion.div>
            )}

            <div className="mt-14 rounded-[4px] bg-bark p-7 text-straw lg:hidden">
              <p className="font-display text-xl">لم تجد جوابك؟</p>
              <p className="mt-2 text-[15px] text-straw/75">راسل الغرفة مباشرة عبر البريد الإلكتروني.</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-5 inline-block rounded-full bg-straw px-5 py-2 text-[15px] font-bold text-bark-deep"
              >
                راسلنا
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
