import { motion } from 'framer-motion'
import { NAV, PAGES } from '../data'
import { Link, usePath, useTitle } from '../router'
import WeaveCanvas from '../components/WeaveCanvas'
import { Strip, ease } from '../components/ui'

export default function NotFound() {
  useTitle('الصفحة غير موجودة')
  const path = usePath()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-bark text-straw">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #e6d5b3 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, #e6d5b3 0 1px, transparent 1px 13px)',
        }}
        aria-hidden="true"
      />

      <div className="gutter relative mx-auto grid w-full max-w-7xl items-center gap-12 pb-20 pt-32 lg:grid-cols-[1fr_1fr] lg:gap-8">
        {/* 4 ◯ 4: the zero is a doum weave you can play with */}
        <div className="flex items-center justify-center gap-[3vw] lg:order-2" dir="ltr" aria-hidden="true">
          {['4', null, '4'].map((d, i) =>
            d ? (
              <motion.span
                key={i}
                className="font-latin text-[clamp(7rem,20vw,15rem)] font-semibold leading-none text-straw"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                {d}
              </motion.span>
            ) : (
              <motion.span
                key={i}
                className="relative block aspect-square w-[clamp(6.5rem,18vw,13.5rem)] rounded-full ring-2 ring-straw/70 ring-offset-[6px] ring-offset-bark"
                initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.15, ease }}
              >
                <WeaveCanvas circle cell={26} className="absolute inset-0 h-full w-full cursor-crosshair touch-none" />
              </motion.span>
            ),
          )}
        </div>

        <div className="min-w-0 lg:order-1">
          <motion.p
            className="latin text-sm font-semibold tracking-[0.3em] text-straw-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ERREUR 404
          </motion.p>
          <motion.h1
            className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-semibold"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            انقطعت الضفيرة هنا
          </motion.h1>
          <Strip light className="mt-5" />
          <motion.p
            className="mt-7 max-w-[32rem] text-lg text-straw/85"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            الصفحة التي تبحث عنها غير موجودة، أو نُقلت إلى مكان آخر. وكما يصل الحرفي ضفيرة بأخرى بـ«التوكال»، نعيدك إلى
            الطريق:
          </motion.p>
          {path !== '/' && (
            <p className="mt-3 text-[15px] text-straw/55">
              العنوان المطلوب: <code className="latin rounded-[3px] bg-bark-deep/60 px-2 py-0.5 text-straw/80">{path}</code>
            </p>
          )}

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
          >
            <Link
              to="/"
              className="rounded-full bg-straw px-6 py-3 font-bold text-bark-deep transition-transform hover:-translate-y-0.5"
            >
              العودة إلى الرئيسية
            </Link>
            <Link
              to={PAGES[0].to}
              className="rounded-full border border-straw/40 px-6 py-3 font-bold text-straw transition-colors hover:border-straw hover:bg-straw/5"
            >
              {PAGES[0].label}
            </Link>
          </motion.div>

          <motion.nav
            aria-label="أقسام الموقع"
            className="mt-12 border-t border-straw/15 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
          >
            <p className="text-sm text-straw-deep">أو اذهب مباشرة إلى:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={`/#${id}`}
                    className="block rounded-full bg-bark-deep/50 px-3.5 py-1.5 text-[15px] text-straw/85 transition-colors hover:bg-straw hover:text-bark-deep"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>
    </section>
  )
}
