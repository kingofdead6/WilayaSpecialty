import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { BORDERS, CRAFTS, DISTANCES, NAME_PARTS } from '../data'
import { Reveal, Title, ease } from './ui'
import map from '../assets/map.png'

function CountUp({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [v, setV] = useState(to)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {v}
    </span>
  )
}

export default function Tissemsilt() {
  return (
    <section id="tissemsilt" className="fibre scroll-mt-16 bg-paper">
      <div className="gutter mx-auto max-w-7xl py-24 lg:py-32">
        <Title>مدينة تيسمسيلت</Title>

        {/* the name, read as an equation */}
        <Reveal className="mt-14">
          <p className="max-w-xl text-lg">تسمية تيسمسيلت من أصل بربري أمازيغي، وتنقسم إلى كلمتين:</p>
          <div className="mt-8 flex flex-wrap items-start gap-x-6 gap-y-8 sm:gap-x-10">
            {NAME_PARTS.map((p, i) => (
              <div key={p.word} className="flex items-start gap-x-6 sm:gap-x-10">
                <div>
                  <div className="font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-none text-bark">{p.word}</div>
                  <div className="mt-3 text-[15px] text-rust">{p.meaning}</div>
                </div>
                {i === 0 && (
                  <span className="pt-[0.2em] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-straw-deep" aria-hidden="true">
                    +
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-start gap-x-6 sm:gap-x-10">
              <span className="pt-[0.2em] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-straw-deep" aria-hidden="true">
                =
              </span>
              <div>
                <div className="font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-none text-bark">غروب الشمس</div>
                <div className="mt-3 text-[15px] text-rust">معنى تيسمسيلت</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-24 grid items-center gap-16 lg:grid-cols-2">
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[36rem] text-lg">
                تُعد ولاية تيسمسيلت عاصمة <strong className="font-bold">الونشريس</strong>، وهي من ولايات الهضاب العليا الغربية،
                تحدها من الجهات الأربع عدة ولايات:
              </p>
            </Reveal>

            <dl className="mt-8 grid max-w-[36rem] grid-cols-1 border-t border-bark/15 sm:grid-cols-2">
              {BORDERS.map((b, i) => (
                <Reveal key={b.side} delay={i * 0.08} className="border-b border-bark/15 py-4 sm:odd:pl-6">
                  <dt className="text-sm font-bold text-rust">{b.side}</dt>
                  <dd className="mt-1">{b.value}</dd>
                </Reveal>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap gap-x-14 gap-y-8">
              {DISTANCES.map((d) => (
                <div key={d.km}>
                  <div className="font-latin text-5xl font-semibold text-bark">
                    <CountUp to={d.km} />
                    <span className="ms-2 font-body text-xl font-normal">كم</span>
                  </div>
                  <div className="mt-1 text-[15px] text-bark/70">{d.to}</div>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="relative mx-auto w-full max-w-[540px]">
            <img src={map} alt="خريطة الجزائر وموقع ولاية تيسمسيلت في الشمال الغربي" className="w-full" />
            {/* pin on Tissemsilt */}
            <div className="absolute" style={{ left: '49.8%', top: '7.9%' }}>
              <span className="pulse-ring absolute left-0 top-0 h-6 w-6 rounded-full border-2 border-bark" />
              <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bark ring-4 ring-paper" />
              <motion.span
                className="absolute top-0 whitespace-nowrap rounded-full bg-bark px-3 py-1 text-sm text-straw"
                style={{ right: 18, translateY: '-50%' }}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                تيسمسيلت
              </motion.span>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24">
          <h3 className="text-2xl font-semibold">أهم الحرف التقليدية التي تشتهر بها ولاية تيسمسيلت</h3>
          <ul className="mt-8 flex flex-wrap gap-3">
            {CRAFTS.map((c, i) => (
              <li
                key={c}
                className={`rounded-full px-5 py-2.5 text-[16px] ${
                  i === CRAFTS.length - 1 ? 'bg-bark font-bold text-straw' : 'border border-bark/25 text-bark'
                }`}
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
