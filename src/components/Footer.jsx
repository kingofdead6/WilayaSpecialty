import { useState } from 'react'
import { CONTACT } from '../data'
import logoCream from '../assets/logo-cream.png'
import wordmark from '../assets/wordmark-cream.png'

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

  return (
    <footer className="bg-bark-deep text-straw" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="gutter mx-auto grid max-w-7xl gap-14 py-20 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex items-center gap-6">
          <img src={logoCream} alt="شعار سلالة تيسمسيلت" className="w-28 shrink-0 sm:w-36" />
          <div className="min-w-0">
            <img src={wordmark} alt="سلالة تيسمسيلت" className="w-full max-w-[260px]" />
            <p className="mt-4 text-straw/75">{CONTACT.org}</p>
            <p className="latin mt-1 text-sm tracking-[0.2em] text-straw-deep">{CONTACT.latin}</p>
          </div>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm text-straw-deep">البريد الإلكتروني</dt>
            <dd className="mt-1 flex flex-wrap items-center gap-3">
              <span className="latin select-all break-all text-lg">{CONTACT.email}</span>
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-straw/30 px-3 py-1 text-sm transition-colors hover:bg-straw hover:text-bark-deep"
              >
                {copied ? 'تم النسخ' : 'نسخ'}
              </button>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-straw-deep">رقم الهاتف</dt>
            <dd className="latin mt-1 text-lg tabular-nums">{CONTACT.phone}</dd>
          </div>
          <div>
            <dt className="text-sm text-straw-deep">الفاكس</dt>
            <dd className="latin mt-1 text-lg tabular-nums">{CONTACT.fax}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-straw-deep">صفحة الفيسبوك</dt>
            <dd className="mt-1 text-lg">{CONTACT.facebook}</dd>
          </div>
        </dl>
      </div>
      <div className="gutter mx-auto max-w-7xl border-t border-straw/10 py-6 text-sm text-straw/55">
        © {new Date().getFullYear()} {CONTACT.org}. صناعة تقليدية جزائرية.
      </div>
    </footer>
  )
}
