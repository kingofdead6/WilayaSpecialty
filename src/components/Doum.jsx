import { motion } from 'framer-motion'
import { PLANTS } from '../data'
import { Reveal, Title, ease } from './ui'

/** A dwarf-palm fan leaf drawn leaflet by leaflet. */
function FanLeaf() {
  const leaflets = 15
  const cx = 250, cy = 420
  return (
    <svg viewBox="0 0 500 460" className="w-full" role="img" aria-label="رسم لورقة الدوم على شكل مروحة">
      <motion.path
        d={`M ${cx} ${cy} L ${cx} 455`}
        stroke="#7b886a" strokeWidth="6" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      />
      {Array.from({ length: leaflets }).map((_, i) => {
        const a = (-168 + (i * 156) / (leaflets - 1)) * (Math.PI / 180)
        const len = 200 + Math.sin((i / (leaflets - 1)) * Math.PI) * 120
        const x2 = cx + Math.cos(a) * len
        const y2 = cy + Math.sin(a) * len
        const mx = cx + Math.cos(a) * len * 0.55 + Math.cos(a + Math.PI / 2) * 10
        const my = cy + Math.sin(a) * len * 0.55 + Math.sin(a + Math.PI / 2) * 10
        return (
          <motion.path
            key={i}
            d={`M ${cx} ${cy} Q ${mx} ${my} ${x2} ${y2}`}
            stroke={i % 3 === 1 ? '#9aa58a' : '#7b886a'}
            strokeWidth={i % 2 ? 5 : 7}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: 0.3 + Math.abs(i - (leaflets - 1) / 2) * 0.07, ease }}
          />
        )
      })}
      {/* olive-like fruit */}
      {[[cx - 18, cy + 8], [cx + 16, cy + 12], [cx - 2, cy + 22]].map(([x, y], i) => (
        <motion.ellipse
          key={i}
          cx={x} cy={y} rx="9" ry="7"
          fill="#c4a46f"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
          transition={{ delay: 1.6 + i * 0.12, type: 'spring', stiffness: 300, damping: 14 }}
        />
      ))}
    </svg>
  )
}

export default function Doum() {
  return (
    <section id="doum" className="fibre scroll-mt-16 bg-paper">
      <div className="gutter mx-auto max-w-7xl py-24 lg:py-32">
        <Title>المادة الأولية</Title>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <div className="min-w-0">
            <Reveal>
              <p className="max-w-[36rem] text-lg">
                تُعتبر النباتات الطبيعية المنتشرة في سفوح جبال الونشريس بتيسمسيلت أهم المواد الأولية في صناعة منتجات السلالة،
                وتعتمد بصفة رئيسية على الدوم والحلفاء.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="النباتات المستعملة">
                {PLANTS.map((p, i) => (
                  <li
                    key={p}
                    className={`rounded-[3px] px-4 py-2 text-[15px] ${
                      i < 2 ? 'bg-leaf font-bold text-paper' : 'bg-straw/70 text-bark'
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-14 border-s-4 border-leaf ps-6">
              <h3 className="text-3xl font-semibold">شجيرة الدوم</h3>
              <p className="mt-2 text-[15px] text-rust">النخيل الزاحف أو النخيل القزم، من فصيلة النخيليات</p>
              <p className="mt-5 max-w-[36rem]">
                تنبت في المناطق الجافة والحارة، وتنتشر في التلال وسفوح الجبال ذات التربة الحمراء. نبات معمّر ينبت على مدار
                السنة، أوراقه في شكل مروحة خضراء مائلة إلى الفضي، أزهاره ثلاثية الشكل، وثماره تشبه حبات الزيتون.
              </p>
            </Reveal>
          </div>

          <div className="mx-auto w-full max-w-[460px]">
            <FanLeaf />
          </div>
        </div>
      </div>
    </section>
  )
}
