import { motion } from 'framer-motion'

const ease = [0.22, 0.8, 0.3, 1]

/** Rises into place when scrolled into view. Starts partly visible so nothing is ever hidden. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0.5, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Section title: Kufi display with a short woven strip underneath. */
export function Title({ children, light = false, className = '' }) {
  return (
    <div className={className}>
      <h2 className={`text-[clamp(2rem,4.6vw,3.4rem)] font-semibold ${light ? 'text-straw' : 'text-bark'}`}>
        {children}
      </h2>
      <Strip light={light} className="mt-4" />
    </div>
  )
}

/** A short run of over-under strip segments that weaves in when seen. */
export function Strip({ light = false, className = '', count = 9 }) {
  const a = light ? 'bg-straw' : 'bg-bark'
  const b = light ? 'bg-straw-deep' : 'bg-straw-deep'
  return (
    <div className={`flex gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className={`block h-[7px] rounded-[2px] ${i % 2 ? b : a}`}
          style={{ width: i % 2 ? 10 : 22, originX: 1 }}
          initial={{ scaleX: 0.15 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease }}
        />
      ))}
    </div>
  )
}

export { ease }
