import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { NAV, PAGES } from '../data'
import { Link, usePath } from '../router'
import logoCream from '../assets/logo-cream.png'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  // clip rather than scale, so the woven segments never stretch; fills from the right (RTL)
  const clip = useTransform(progress, (v) => `inset(0 0 0 ${(1 - v) * 100}%)`)
  const tip = useTransform(progress, (v) => `${v * 100}%`)
  const tipOpacity = useTransform(progress, [0, 0.01, 0.99, 1], [0, 1, 1, 0])
  const path = usePath()

  useEffect(() => {
    setActive('')
    setOpen(false)
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
  }, [path])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid || open ? 'bg-bark-deep/92 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="gutter mx-auto flex h-16 max-w-7xl items-center justify-between gap-6">
        <Link to="/#top" className="flex items-center gap-3 text-straw" aria-label="سلالة تيسمسيلت، الصفحة الرئيسية">
          <img src={logoCream} alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg leading-none">سلالة تيسمسيلت</span>
        </Link>

        <nav className="hidden lg:block" aria-label="أقسام الصفحة">
          <ul className="flex items-center gap-1">
            {NAV.map(({ id, label }) => (
              <li key={id}>
                <Link
                  to={`/#${id}`}
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
                </Link>
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
                  <Link
                    to={`/#${id}`}
                    onClick={() => setOpen(false)}
                    className="block border-b border-straw/10 py-3 font-display text-xl text-straw"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2 pb-6">
              {PAGES.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`block rounded-full border px-4 py-1.5 text-[15px] ${
                      path === to ? 'border-straw bg-straw text-bark-deep' : 'border-straw/25 text-straw/85'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* reading progress: a strip of doum plait that weaves itself across the bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]" aria-hidden="true">
        <motion.div className="weave-progress h-full w-full" style={{ clipPath: clip }} />
        <motion.span
          className="absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rounded-full bg-straw shadow-[0_0_10px_2px_rgb(230_213_179/0.55)]"
          style={{ right: tip, opacity: tipOpacity }}
        />
      </div>
    </header>
  )
}
