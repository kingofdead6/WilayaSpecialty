import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { STAGES } from '../data'
import { Reveal, Title } from './ui'

export default function Stages() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section id="stages" className="scroll-mt-16 bg-straw/45">
      <div className="gutter mx-auto grid max-w-7xl gap-14 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:py-32">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Title>مراحل تحضير مادة الدوم</Title>
          <Reveal>
            <p className="mt-8 max-w-[30rem] text-lg">
              تمر عملية تحضير الدوم بعدة مراحل متتالية للوصول إلى مادة أولية ذات جودة، قابلة للاستغلال في إنتاج منتجات موجهة
              لعدة استعمالات.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative min-w-0">
          {/* the line fills as you read down */}
          <span className="absolute bottom-6 right-[27px] top-6 w-[3px] rounded bg-bark/12" aria-hidden="true" />
          <motion.span
            className="absolute bottom-6 right-[27px] top-6 w-[3px] origin-top rounded bg-bark"
            style={{ scaleY: fill }}
            aria-hidden="true"
          />
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s.title} className="relative grid grid-cols-[56px_1fr] gap-5 pb-12 last:pb-0">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-bark font-latin text-lg font-semibold text-straw ring-[6px] ring-[#eee2cc]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 pt-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                  <span className="rounded-full bg-paper px-3 py-0.5 text-sm text-rust">{s.stat}</span>
                </div>
                <p className="mt-3 max-w-[34rem]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
