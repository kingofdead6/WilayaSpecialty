import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { POLICIES, POLICIES_UPDATED } from '../data'
import { jumpTo, useTitle } from '../router'
import PageHeader from '../components/PageHeader'
import { Reveal } from '../components/ui'

const updated = new Intl.DateTimeFormat('ar-DZ', { day: 'numeric', month: 'long', year: 'numeric' }).format(
  new Date(POLICIES_UPDATED),
)

export default function Policies() {
  useTitle('السياسات وشروط الاستخدام')
  const [active, setActive] = useState(POLICIES[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace('policy-', ''))),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    POLICIES.forEach(({ id }) => {
      const el = document.getElementById(`policy-${id}`)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <PageHeader eyebrow="السياسات" title="السياسات وشروط الاستخدام">
        <p>كيف يعمل هذا الموقع، وما الذي نفعله ببياناتك (باختصار: لا شيء)، وقواعد استعمال علامة «سلالة تيسمسيلت».</p>
        <p className="mt-4 text-[15px] text-straw-deep">
          آخر تحديث: <time dateTime={POLICIES_UPDATED}>{updated}</time>
        </p>
      </PageHeader>

      <div className="bg-paper">
        <div className="gutter mx-auto grid max-w-7xl gap-14 py-20 lg:grid-cols-[17rem_1fr] lg:gap-20 lg:py-28">
          <nav aria-label="محتويات الصفحة" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold text-rust">المحتويات</p>
            <ol className="relative mt-4 grid gap-0.5 border-s border-bark/15">
              {POLICIES.map((p, i) => (
                <li key={p.id} className="relative">
                  {active === p.id && (
                    <motion.span
                      layoutId="policy-marker"
                      className="absolute -start-px inset-y-1 w-[3px] rounded bg-bark"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <a
                    href={`#policy-${p.id}`}
                    aria-current={active === p.id ? 'location' : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      jumpTo(`policy-${p.id}`)
                    }}
                    className={`flex gap-3 py-2 ps-5 text-[15px] transition-colors ${
                      active === p.id ? 'font-bold text-bark' : 'text-bark/65 hover:text-bark'
                    }`}
                  >
                    <span className="font-latin text-xs leading-7 text-bark/40">{String(i + 1).padStart(2, '0')}</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-[46rem]">
            {POLICIES.map((p, i) => (
              <section
                key={p.id}
                id={`policy-${p.id}`}
                className="scroll-mt-24 border-t border-bark/15 pb-12 pt-10 first:border-t-0 first:pt-0"
              >
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-latin text-sm font-semibold text-straw-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] font-semibold">{p.title}</h2>
                  </div>
                  <div className="mt-5 grid gap-4 text-bark/85">
                    {p.body?.map((t) => <p key={t}>{t}</p>)}
                    {p.list && (
                      <ul className="grid gap-3">
                        {p.list.map((t) => (
                          <li key={t} className="flex gap-3">
                            <span className="mt-[0.8em] h-[6px] w-4 shrink-0 rounded-[2px] bg-straw-deep" aria-hidden="true" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
