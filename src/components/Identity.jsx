import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Reveal, Title, ease } from './ui'
import logoBrown from '../assets/logo-brown.png'
import logoCream from '../assets/logo-cream.png'
import kraft from '../assets/kraft.jpg'

const CMYK = [
  { k: 'Cyan', v: 47, c: '#3aa6c9' },
  { k: 'Magenta', v: 66, c: '#c2477e' },
  { k: 'Yellow', v: 75, c: '#d9b52c' },
  { k: 'Black', v: 70, c: '#2b2b2b' },
]

function CopyHex() {
  const [state, setState] = useState('idle')
  const ref = useRef(null)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('#472e1e')
      setState('done')
    } catch {
      const r = document.createRange()
      r.selectNodeContents(ref.current)
      const s = window.getSelection()
      s.removeAllRanges()
      s.addRange(r)
      setState('selected')
    }
    setTimeout(() => setState('idle'), 1800)
  }
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <code ref={ref} className="latin rounded-[3px] bg-bark/8 px-3 py-1.5 text-[15px] font-semibold">#472e1e</code>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-bark/30 px-4 py-1.5 text-sm font-bold transition-colors hover:bg-bark hover:text-straw"
      >
        {state === 'done' ? 'تم النسخ' : state === 'selected' ? 'محدد، اضغط Ctrl+C' : 'نسخ اللون'}
      </button>
    </div>
  )
}

function Versions() {
  const items = [
    { label: 'بالألوان الرئيسية', bg: 'bg-paper border border-bark/15', img: logoBrown, cls: '' },
    { label: 'بالأسود', bg: 'bg-white border border-bark/15', img: logoBrown, cls: 'brightness-0' },
    { label: 'المعكوسة', bg: 'bg-bark', img: logoCream, cls: '' },
  ]
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {items.map((it, i) => (
        <Reveal key={it.label} delay={i * 0.1}>
          <figure>
            <div className={`grid aspect-square place-items-center rounded-[3px] p-10 ${it.bg}`}>
              <motion.img
                src={it.img}
                alt={`شعار سلالة تيسمسيلت، النسخة ${it.label}`}
                className={`w-full max-w-[220px] ${it.cls}`}
                whileHover={{ rotate: -4, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-bark/80">{it.label}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  )
}

function ProtectionZone() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] bg-bark p-[16%]">
      {/* clear-space frame */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.rect
          x="8" y="8" width="84" height="84"
          fill="none" stroke="#e6d5b3" strokeOpacity="0.6" strokeWidth="0.5" strokeDasharray="2 1.5"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
        />
      </svg>
      {['top-0 right-0', 'top-0 left-0', 'bottom-0 right-0', 'bottom-0 left-0'].map((pos, i) => (
        <motion.span
          key={pos}
          className={`absolute ${pos} h-[8%] w-[8%] border border-straw/60`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 260, damping: 18 }}
        />
      ))}
      <img src={logoCream} alt="الشعار داخل منطقة الحماية" className="relative h-full w-full object-contain" />
    </div>
  )
}

export default function Identity() {
  const bandRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: bandRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section id="identity" className="scroll-mt-16 bg-paper">
      <div className="gutter mx-auto max-w-7xl pb-16 pt-24 lg:pt-32">
        <Title>دفتر الهوية البصرية</Title>
        <Reveal>
          <p className="mt-8 max-w-[40rem] text-lg">
            طُوّر هذا الدفتر لضمان التعرف البصري الموحد عبر مختلف المنصات المستعملة. إن احترام هذه القواعد أمر ضروري للحفاظ
            على وحدة تناسق صورة «سلالة تيسمسيلت».
          </p>
        </Reveal>
      </div>

      {/* the emblem, pressed into kraft paper */}
      <div ref={bandRef} className="relative h-[46vh] min-h-[300px] overflow-hidden lg:h-[62vh]">
        <motion.img
          src={kraft}
          alt="ختم شعار سلالة تيسمسيلت منقوش على ورق الكرافت"
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover"
          style={{ y: bgY }}
        />
      </div>

      <div className="gutter mx-auto max-w-7xl py-24 lg:py-28">
        {/* main element */}
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0">
            <h3 className="text-3xl font-semibold">العنصر الرئيسي</h3>
            <dl className="mt-8 grid gap-7">
              <Reveal>
                <dt className="font-bold text-rust">مكونات العنصر</dt>
                <dd className="mt-1 max-w-[30rem]">
                  نصوص ورسومات توضيحية لضمان التعرف البصري الموحد. يجب عدم تعديل هذا العنصر أو دمجه مع عناصر رسومية أخرى.
                </dd>
              </Reveal>
              <Reveal delay={0.05}>
                <dt className="font-bold text-rust">الرمز</dt>
                <dd className="mt-1">رمز مرتبط بالنص: رسم ضفيرة من الدوم.</dd>
              </Reveal>
              <Reveal delay={0.1}>
                <dt className="font-bold text-rust">الإمضاء</dt>
                <dd className="mt-1 max-w-[30rem]">النص غير قابل للتغيير، ولا يُسمح إلا باستعمال النسخ الثلاث المعروضة.</dd>
              </Reveal>
            </dl>
          </div>
          <div className="min-w-0">
            <Versions />
            <p className="mt-6 max-w-[40rem] text-[15px] text-bark/75">
              عندما لا يكون تباين الألوان مرتفعا بدرجة كافية بين العنصر الرسومي والخلفية، تُستعمل النسخة السوداء أو المعكوسة
              لضمان أقصى قدر من المقروئية.
            </p>
          </div>
        </div>

        {/* protection zone */}
        <div className="mt-28 grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="min-w-0">
            <h3 className="text-3xl font-semibold">منطقة الحماية</h3>
            <p className="mt-5 max-w-[30rem]">
              أُنشئت منطقة حماية حول الشعار لكي تحافظ على مشروعيته وتحول دون تعارضه مع عناصر بصرية أخرى. لا يدخل هذا الحيز
              أي نص أو صورة.
            </p>
          </Reveal>
          <ProtectionZone />
        </div>

        {/* colour + type */}
        <div className="mt-28 grid gap-16 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className="text-3xl font-semibold">اللون الرسمي</h3>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <motion.div
                className="h-36 w-36 shrink-0 rounded-full bg-bark"
                initial={{ scale: 0.4 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              />
              <div className="min-w-0">
                <p className="latin text-sm font-semibold tracking-[0.18em]">BROWN HERBAL</p>
                <p className="text-[15px] text-bark/75">لون نباتي بني</p>
                <CopyHex />
              </div>
            </div>
            <dl className="latin mt-10 grid max-w-[26rem] gap-3">
              {CMYK.map((c, i) => (
                <div key={c.k} className="grid grid-cols-[80px_1fr_40px] items-center gap-3 text-sm">
                  <dt className="font-semibold">{c.k}</dt>
                  <dd className="h-2 overflow-hidden rounded-full bg-bark/10">
                    <motion.span
                      className="block h-full origin-left rounded-full"
                      style={{ backgroundColor: c.c, width: `${c.v}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.12, ease }}
                    />
                  </dd>
                  <dd className="text-end tabular-nums">{c.v}%</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            <h3 className="text-3xl font-semibold">الخطوط</h3>
            <p className="mt-3 max-w-[30rem] text-[15px] text-bark/75">
              للحفاظ على الاستمرارية في الوثائق من الضروري استخدام الخطوط التالية.
            </p>
            <div className="mt-8 divide-y divide-bark/15 border-y border-bark/15">
              <Reveal className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="latin font-semibold text-rust">Montserrat</span>
                  <span className="latin text-xs text-bark/60">Modern, 16 pts, Brown Herbal</span>
                </div>
                <p className="latin mt-3 break-words text-[clamp(1rem,2vw,1.25rem)] leading-relaxed">
                  abcdefghijklmnopqrstuvwxyz
                  <br />
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  123456789
                </p>
              </Reveal>
              <Reveal className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="latin font-semibold text-rust">Al Arabiya</span>
                  <span className="text-xs text-bark/60">معاينة بخط ويب قريب</span>
                </div>
                <p className="mt-3 font-naskh text-3xl">صناعة تقليدية جزائرية</p>
              </Reveal>
              <Reveal className="py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="latin font-semibold text-rust">ArabFont Kufi LT</span>
                  <span className="text-xs text-bark/60">معاينة بخط ويب قريب</span>
                </div>
                <p className="mt-3 font-display text-3xl">سلالة تيسمسيلت</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
