import { motion } from 'framer-motion'
import WeaveCanvas from './WeaveCanvas'
import wordmark from '../assets/wordmark-cream.png'
import { ease } from './ui'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bark text-straw">
      {/* faint fibre grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #e6d5b3 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, #e6d5b3 0 1px, transparent 1px 13px)',
        }}
        aria-hidden="true"
      />

      <div className="gutter relative mx-auto grid max-w-7xl items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-36">
        <div className="min-w-0">
          <motion.p
            className="text-[15px] text-straw/75"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            غرفة الصناعة التقليدية و الحرف تيسمسيلت
          </motion.p>

          <h1 className="mt-6">
            <span className="sr-only">سلالة تيسمسيلت</span>
            <motion.img
              src={wordmark}
              alt=""
              className="w-full max-w-[560px]"
              initial={{ clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0%)' }}
              transition={{ duration: 1.4, delay: 0.25, ease }}
            />
          </h1>

          <motion.div
            className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span className="font-display text-2xl text-straw">صناعة تقليدية جزائرية</span>
            <span className="latin text-sm font-semibold tracking-[0.32em] text-straw-deep">Artisanat d’Algérie</span>
          </motion.div>

          <motion.p
            className="mt-6 max-w-[34rem] text-lg leading-[1.95] text-straw/85"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
          >
            لما كانت الحاجة أم الاختراع، أبدع سكان الونشريس في صناعة منتجات مختلفة من الدوم والحلفاء، فطوّعوها في
            أشكال وتصاميم تحمل رموز محيطهم وحياتهم اليومية.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease }}
          >
            <a
              href="#history"
              className="rounded-full bg-straw px-6 py-3 font-bold text-bark-deep transition-transform hover:-translate-y-0.5"
            >
              اكتشف الحرفة
            </a>
            <a
              href="#identity"
              className="rounded-full border border-straw/40 px-6 py-3 font-bold text-straw transition-colors hover:border-straw hover:bg-straw/5"
            >
              دفتر الهوية البصرية
            </a>
          </motion.div>
        </div>

        {/* the woven disc: echoes the plait at the heart of the emblem */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <motion.path
              d="M 330 18 A 245 245 0 0 0 30 330"
              fill="none"
              stroke="#e6d5b3"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.6, ease }}
            />
            <motion.path
              d="M 190 502 A 245 245 0 0 0 490 190"
              fill="none"
              stroke="#e6d5b3"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.9, ease }}
            />
            <motion.line
              x1="330" y1="18" x2="470" y2="18"
              stroke="#e6d5b3" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2.1, ease }}
            />
            <motion.line
              x1="190" y1="502" x2="50" y2="502"
              stroke="#e6d5b3" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 2.4, ease }}
            />
          </svg>
          <WeaveCanvas circle cell={40} className="absolute inset-[12%] h-[76%] w-[76%] cursor-crosshair touch-none" />
        </div>
      </div>

      <motion.a
        href="#tissemsilt"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-straw/60 md:block"
        aria-label="انزل إلى القسم التالي"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="1" y="1" width="20" height="32" rx="10" />
          <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round" />
        </svg>
      </motion.a>
    </section>
  )
}
