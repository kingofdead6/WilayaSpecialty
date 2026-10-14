import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { NAV } from '../data'
import logoCream from '../assets/logo-cream.png'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid || open ? 'bg-bark-deep/92 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="gutter mx-auto flex h-16 max-w-7xl items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 text-straw" aria-label="سلالة تيسمسيلت، العودة إلى الأعلى">
          <img src={logoCream} alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg leading-none">سلالة تيسمسيلت</span>
        </a>

        <nav className="hidden lg:block" aria-label="أقسام الصفحة">
          <ul className="flex items-center gap-1">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative rounded-full px-3.5 py-1.5 text-[15px] transition-colors ${
                    active === id ? 'text-bark-deep' : 'text-straw/80 hover:text-straw'
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-straw"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-full text-straw lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`absolute h-[2px] w-5 bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[6px]'}`} />
          <span className={`absolute h-[2px] w-5 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute h-[2px] w-5 bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[6px]'}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="أقسام الصفحة"
            className="gutter overflow-hidden lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.8, 0.3, 1] }}
          >
            <ul className="grid gap-1 pb-6 pt-2">
              {NAV.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-straw/10 py-3 font-display text-xl text-straw"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-right bg-straw-deep"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </header>
  )
}
