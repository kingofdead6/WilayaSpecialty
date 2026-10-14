import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT, NAV, PAGES } from '../data'
import { Link } from '../router'
import { Reveal, ease } from './ui'
import logoCream from '../assets/logo-cream.png'
import wordmark from '../assets/wordmark-cream.png'

const icon = {
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  phone: (
    <path d="M6.6 3.5h2.7l1.4 4-2 1.3a10.5 10.5 0 0 0 6.5 6.5l1.3-2 4 1.4v2.7a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  fax: <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />,
  fb: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8Z" />,
}

function Icon({ name }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-straw/8 text-straw-deep ring-1 ring-straw/10 transition-colors group-hover:bg-straw group-hover:text-bark-deep">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
        {icon[name]}
      </svg>
    </span>
  )
}

function ColTitle({ children }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-lg text-straw">
      {children}
      <span className="flex gap-[3px]" aria-hidden="true">
        <span className="h-[5px] w-3 rounded-[1px] bg-straw-deep" />
        <span className="h-[5px] w-1.5 rounded-[1px] bg-straw/40" />
      </span>
    </h2>
  )
}

const linkCls =
  'inline-flex items-center gap-2 py-1 text-straw/70 transition-colors hover:text-straw before:h-px before:w-0 before:bg-straw-deep before:transition-all before:duration-300 hover:before:w-3'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* the address stays selectable */
    }
  }
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden bg-bark-deep text-straw"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* the hem: a full-width woven band */}
      <div className="weave-band h-3 w-full" aria-hidden="true" />

      {/* call to action */}
      <div className="gutter mx-auto max-w-7xl">
        <div className="grid items-end gap-8 border-b border-straw/10 py-16 lg:grid-cols-[1fr_auto] lg:py-20">
          <Reveal>
            <p className="latin text-xs font-semibold tracking-[0.32em] text-straw-deep">ARTISANAT D’ALGÉRIE</p>
            <p className="mt-3 max-w-[44rem] font-display text-[clamp(1.8rem,4vw,2.9rem)] leading-tight">
              حرفة تُضفر باليد، وتُحفظ بالمعرفة.
            </p>
            <p className="mt-3 max-w-[32rem] text-straw/70">
              لسؤال عن الحرفة أو الحرفيين أو استعمال العلامة، تواصلوا مع الغرفة.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-straw py-2 pe-6 ps-2 font-bold text-bark-deep transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-bark-deep text-straw transition-transform duration-300 group-hover:-rotate-12">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                  {icon.mail}
                </svg>
              </span>
              راسلنا
            </a>
            <Link
              to="/faq"
              className="inline-flex items-center rounded-full border border-straw/30 px-6 py-2 font-bold transition-colors hover:border-straw hover:bg-straw/5"
            >
              الأسئلة الشائعة
            </Link>
          </Reveal>
        </div>

        {/* columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.4fr] lg:gap-10">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link to="/#top" className="inline-flex items-center gap-4" aria-label="سلالة تيسمسيلت، الصفحة الرئيسية">
              <motion.img
                src={logoCream}
                alt=""
                className="w-20 shrink-0"
                whileHover={{ rotate: -8 }}
                transition={{ type: 'spring', stiffness: 220, damping: 12 }}
              />
              <img src={wordmark} alt="" className="w-full max-w-[190px]" />
            </Link>
            <p className="mt-6 max-w-[22rem] text-[15px] text-straw/65">
              منتجات من الدوم والحلفاء، يصنعها حرفيو الونشريس بتيسمسيلت وتحمل رموز محيطهم وحياتهم اليومية.
            </p>
            <p className="mt-5 text-[15px] text-straw/80">{CONTACT.org}</p>
            <p className="latin mt-1 text-xs tracking-[0.24em] text-straw-deep">{CONTACT.latin}</p>
          </div>

          <nav aria-label="أقسام الموقع" className="min-w-0">
            <ColTitle>استكشف</ColTitle>
            <ul className="mt-5 grid gap-1">
              {NAV.slice(0, 6).map(({ id, label }) => (
                <li key={id}>
                  <Link to={`/#${id}`} className={linkCls}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="معلومات" className="min-w-0">
            <ColTitle>معلومات</ColTitle>
            <ul className="mt-5 grid gap-1">
              <li>
                <Link to="/#identity" className={linkCls}>
                  دفتر الهوية البصرية
                </Link>
              </li>
              {PAGES.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkCls}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <ColTitle>تواصل معنا</ColTitle>
            <ul className="mt-5 grid gap-4">
              <li className="group flex items-center gap-3">
                <Icon name="mail" />
                <div className="min-w-0">
                  <p className="text-xs text-straw-deep">البريد الإلكتروني</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a href={`mailto:${CONTACT.email}`} className="latin select-all break-all text-[15px] hover:underline">
                      {CONTACT.email}
                    </a>
                    <button
                      type="button"
                      onClick={copy}
                      className="relative overflow-hidden rounded-full border border-straw/25 px-2.5 py-0.5 text-xs transition-colors hover:bg-straw hover:text-bark-deep"
                      aria-live="polite"
                    >
                      <motion.span
                        key={copied ? 'y' : 'n'}
                        className="block"
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.25, ease }}
                      >
                        {copied ? 'تم النسخ ✓' : 'نسخ'}
                      </motion.span>
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\D/g, '')}`} className="group flex items-center gap-3">
                  <Icon name="phone" />
                  <span>
                    <span className="block text-xs text-straw-deep">رقم الهاتف</span>
                    <span className="latin block text-[15px] tabular-nums">{CONTACT.phone}</span>
                  </span>
                </a>
              </li>
              <li className="group flex items-center gap-3">
                <Icon name="fax" />
                <span>
                  <span className="block text-xs text-straw-deep">الفاكس</span>
                  <span className="latin block text-[15px] tabular-nums">{CONTACT.fax}</span>
                </span>
              </li>
              <li className="group flex items-center gap-3">
                <Icon name="fb" />
                <span className="min-w-0">
                  <span className="block text-xs text-straw-deep">صفحة الفيسبوك</span>
                  <span className="block text-[15px]">{CONTACT.facebook}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* giant wordmark watermark */}
      <div className="pointer-events-none relative mx-auto max-w-7xl select-none px-4" aria-hidden="true">
        <img src={wordmark} alt="" className="mx-auto w-full max-w-[1100px] pb-6 opacity-[0.05]" />
      </div>

      <div className="relative border-t border-straw/10">
        <div className="gutter mx-auto flex max-w-7xl flex-col gap-3 pb-24 pt-6 text-sm sm:pb-6 text-straw/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="font-latin">{year}</span> {CONTACT.org}. صناعة تقليدية جزائرية.
          </p>
          {/* clear of the floating back-to-top button */}
          <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:me-16">
            {PAGES.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-straw">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
