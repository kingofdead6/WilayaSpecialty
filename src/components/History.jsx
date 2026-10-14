import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PRODUCTS, USES } from '../data'
import { Reveal, Title } from './ui'
import baskets from '../assets/baskets.jpg'

function Ribbon() {
  const row = [...PRODUCTS, ...PRODUCTS]
  return (
    <div className="relative overflow-hidden border-y border-straw/15 py-6" aria-hidden="true">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[clamp(2rem,5vw,3.6rem)] leading-none text-straw">
            {p}
            <span className="inline-grid grid-cols-2 gap-[3px]">
              <span className="h-2 w-4 rounded-[2px] bg-straw-deep" />
              <span className="h-4 w-2 rounded-[2px] bg-straw-deep/60" />
              <span className="h-4 w-2 rounded-[2px] bg-straw-deep/60" />
              <span className="h-2 w-4 rounded-[2px] bg-straw-deep" />
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function History() {
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="history" className="scroll-mt-16 overflow-hidden bg-bark text-straw">
      <div className="gutter mx-auto grid max-w-7xl gap-16 py-24 lg:grid-cols-[1fr_0.9fr] lg:py-32">
        <div className="min-w-0">
          <Title light>صناعة السلالة في ولاية تيسمسيلت</Title>
          <Reveal className="mt-12">
            <h3 className="text-xl text-straw-deep">نبذة تاريخية</h3>
            <p className="mt-4 max-w-[36rem] text-[clamp(1.2rem,2vw,1.45rem)] leading-[2] text-straw/90">
              لما كانت الحاجة أم الاختراع أبدع سكان ولاية تيسمسيلت في صناعة منتجات مختلفة من السلالة لتسهيل أعبائهم اليومية،
              مستعينين بنباتات طبيعية من الدوم والحلفاء والديس والسمار، فطوّعوها وصمموها في أشكال وتصاميم مختلفة حسب
              استعمالاتها.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <h3 className="text-xl text-straw-deep">لماذا صُنعت</h3>
            <ul className="mt-5 grid max-w-[36rem] gap-3 sm:grid-cols-3">
              {USES.map((u) => (
                <li key={u} className="border-t-2 border-straw-deep/50 pt-3 text-[16px] leading-relaxed">
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={imgRef} className="relative min-h-[420px] overflow-hidden rounded-[2px] lg:min-h-0">
          <motion.img
            src={baskets}
            alt="سلال من الدوم تحمل نباتات خضراء، وعليها ختم سلالة تيسمسيلت"
            className="absolute inset-0 h-[116%] w-full -top-[8%] object-cover"
            style={{ y }}
          />
        </div>
      </div>

      <div className="pb-24 lg:pb-32">
        <p className="gutter mx-auto mb-6 max-w-7xl text-straw/70">
          أنتج الحرفي القفة والسعفة بمختلف الأحجام والأنواع، والمظل، والسجادة، والتفال، والمكنسة، والبردعة، والشواري.
        </p>
        <Ribbon />
      </div>
    </section>
  )
}
