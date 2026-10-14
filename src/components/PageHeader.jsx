import { motion } from 'framer-motion'
import { Link } from '../router'
import { Strip, ease } from './ui'

/** Bark band that opens every secondary page: breadcrumb, title, woven strip, intro. */
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="relative overflow-hidden bg-bark text-straw">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #e6d5b3 0 1px, transparent 1px 9px), repeating-linear-gradient(-45deg, #e6d5b3 0 1px, transparent 1px 13px)',
        }}
        aria-hidden="true"
      />
      <div className="gutter relative mx-auto max-w-7xl pb-16 pt-32 lg:pb-20 lg:pt-40">
        <motion.nav
          aria-label="مسار التصفح"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <ol className="flex items-center gap-2 text-[15px] text-straw/65">
            <li>
              <Link to="/" className="transition-colors hover:text-straw">
                الرئيسية
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-straw">
              {eyebrow}
            </li>
          </ol>
        </motion.nav>
        <motion.h1
          className="mt-5 text-[clamp(2.3rem,6vw,4.4rem)] font-semibold"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          {title}
        </motion.h1>
        <Strip light className="mt-5" />
        {children && (
          <motion.div
            className="mt-7 max-w-[40rem] text-lg text-straw/85"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </header>
  )
}
