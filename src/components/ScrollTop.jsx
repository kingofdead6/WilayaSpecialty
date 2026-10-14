import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ease } from './ui'

/** Back-to-top button whose ring fills like a plait being stitched around it as you read. */
export default function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const [show, setShow] = useState(false)
  const [pct, setPct] = useState(0)

  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.7))
  useMotionValueEvent(scrollYProgress, 'change', (v) => setPct(Math.round(v * 100)))

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={`العودة إلى الأعلى، قرأت ${pct}٪ من الصفحة`}
          className="group fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-bark-deep text-straw shadow-[0_10px_30px_-8px_rgb(46_29_18/0.6)] ring-1 ring-straw/15"
          style={{
            left: 'max(20px, env(safe-area-inset-left, 0px))',
            bottom: 'max(20px, env(safe-area-inset-bottom, 0px))',
          }}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.35, ease }}
        >
          <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            {/* the stitches still to come */}
            <circle cx="28" cy="28" r="24" fill="none" stroke="#e6d5b3" strokeOpacity="0.18" strokeWidth="3" strokeDasharray="4 3.5" />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#c4a46f"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <span className="relative h-5 overflow-hidden">
            <span className="flex flex-col items-center transition-transform duration-300 ease-[cubic-bezier(.22,.8,.3,1)] group-hover:-translate-y-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              <span className="font-latin text-[11px] font-semibold leading-5 tabular-nums">{pct}%</span>
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
