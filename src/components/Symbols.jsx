import { motion } from 'framer-motion'
import { SYMBOLS } from '../data'
import { Reveal, Title } from './ui'

export default function Symbols() {
  return (
    <section id="symbols" className="fibre scroll-mt-16 bg-paper">
      <div className="gutter mx-auto max-w-7xl py-24 lg:py-32">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            <Title>التصاميم والرموز الفنية والثقافية</Title>
            <Reveal>
              <p className="mt-8 max-w-[38rem] text-lg">
                تحتوي منتجات السلالة بولاية تيسمسيلت على رموز استلهمها الحرفي من محيطه المعيشي: الحيوانات والطيور والنباتات،
                وأشكال مختلفة مرتبطة بحياته اليومية. وقد يتضمن المنتوج الواحد رمزا واحدا أو أكثر.
              </p>
            </Reveal>
          </div>
          <Reveal className="flex items-baseline gap-4 lg:pb-2">
            <span className="font-latin text-[clamp(4.5rem,10vw,7.5rem)] font-semibold leading-none text-bark">25</span>
            <span className="max-w-[9rem] text-[15px] leading-snug text-bark/75">رمزا تم إحصاؤها، يذكر الدفتر 24 منها بالاسم</span>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[3px] border border-bark/15 bg-bark/15 sm:grid-cols-3 lg:grid-cols-4">
          {SYMBOLS.map((s, i) => (
            <motion.li
              key={s}
              className="group relative bg-paper"
              initial={{ opacity: 0.5 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
            >
              <span
                className="absolute inset-0 origin-right scale-x-0 bg-bark transition-transform duration-500 ease-[cubic-bezier(.22,.8,.3,1)] group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="relative flex min-h-[112px] items-end p-5 font-display text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-bark transition-colors duration-500 group-hover:text-straw">
                {s}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
