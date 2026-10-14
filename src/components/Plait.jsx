import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PLAITS, TECHNIQUES } from '../data'
import { Reveal, Title, ease } from './ui'

const TONES = ['#e6d5b3', '#d9c49c', '#ead9b9', '#d0b486']

/** A flat herringbone plait whose fibre count matches the number of doum leaves. */
function Braid({ leaves }) {
  const unit = 13
  const W = leaves * unit
  const half = W / 2
  const r = 26 // row height
  const slant = half * 0.6
  const rows = 11
  const H = rows * r + slant + r
  const leftFibres = Math.ceil(leaves / 2)
  const rightFibres = Math.floor(leaves / 2)

  const arm = (k, side) => {
    const y = k * r + (side === 'r' ? r / 2 : 0)
    const x0 = side === 'l' ? 0 : W
    const pts = [
      [x0, y],
      [half, y + slant],
      [half, y + slant + r],
      [x0, y + r],
    ]
    const n = side === 'l' ? leftFibres : rightFibres
    const fibres = Array.from({ length: n - 1 }).map((_, f) => {
      const tt = (f + 1) / n
      return [x0, y + r * tt, half, y + slant + r * tt]
    })
    return { pts, fibres }
  }

  return (
    <svg viewBox={`-4 -4 ${W + 8} ${H + 8}`} className="mx-auto h-[420px] w-auto max-w-full" aria-hidden="true">
      {Array.from({ length: rows }).flatMap((_, k) =>
        ['l', 'r'].map((side) => {
          const { pts, fibres } = arm(k, side)
          const tone = TONES[(k * 2 + (side === 'r' ? 1 : 0)) % TONES.length]
          return (
            <motion.g
              key={`${side}${k}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: k * 0.06 + (side === 'r' ? 0.03 : 0), ease }}
            >
              <polygon
                points={pts.map((p) => p.join(',')).join(' ')}
                fill={tone}
                stroke="#2e1d12"
                strokeOpacity="0.55"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {fibres.map(([x1, y1, x2, y2], f) => (
                <line key={f} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#472e1e" strokeOpacity="0.28" strokeWidth="0.8" />
              ))}
            </motion.g>
          )
        }),
      )}
    </svg>
  )
}

export default function Plait() {
  const [sel, setSel] = useState(1)
  const plait = PLAITS[sel]

  return (
    <section id="plait" className="scroll-mt-16 bg-bark-deep text-straw">
      <div className="gutter mx-auto max-w-7xl py-24 lg:py-32">
        <Title light>تقنيات إنتاج منتجات السلالة</Title>
        <Reveal>
          <p className="mt-8 max-w-[38rem] text-lg text-straw/85">
            بالعمل اليدوي يُنتج الحرفي ضفائر وأشرطة الدوم، ثم يشكّل منها منتجات مختلفة. ويختلف عدد الأوراق في الضفيرة حسب
            حجم المنتوج.
          </p>
        </Reveal>

        {/* plait builder */}
        <div className="mt-16 grid items-center gap-12 rounded-[4px] bg-bark p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <h3 className="text-2xl font-semibold">السبتة: كم ورقة في الضفيرة؟</h3>
            <div role="radiogroup" aria-label="عدد أوراق الدوم" className="mt-6 inline-flex rounded-full bg-bark-deep p-1">
              {PLAITS.map((p, i) => (
                <button
                  key={p.leaves}
                  type="button"
                  role="radio"
                  aria-checked={sel === i}
                  onClick={() => setSel(i)}
                  className={`relative rounded-full px-5 py-2 text-[15px] font-bold transition-colors sm:px-6 ${
                    sel === i ? 'text-bark-deep' : 'text-straw/75 hover:text-straw'
                  }`}
                >
                  {sel === i && (
                    <motion.span
                      layoutId="plait-pill"
                      className="absolute inset-0 rounded-full bg-straw"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    <span className="font-latin">{p.leaves}</span> {p.leaves === 9 ? 'أوراق' : 'ورقة'}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={plait.leaves}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="mt-8"
                aria-live="polite"
              >
                <p className="text-straw-deep">
                  سبتة من <span className="font-latin">{plait.leaves}</span> ورقة من الدوم تُستعمل لصناعة {plait.size ? `${plait.size}، مثل` : ''}:
                </p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {plait.items.map((it, i) => (
                    <motion.li
                      key={it}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="rounded-full border border-straw/30 px-4 py-2 font-display text-lg"
                    >
                      {it}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative min-w-0">
            <Braid key={plait.leaves} leaves={plait.leaves} />
          </div>
        </div>

        {/* the other techniques */}
        <div className="mt-20 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {TECHNIQUES.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 0.08} className="border-t border-straw/20 pt-6">
              <h3 className="text-2xl font-semibold text-straw">{t.name}</h3>
              <p className="mt-3 max-w-[34rem] text-straw/80">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
