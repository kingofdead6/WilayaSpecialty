import { useEffect, useRef } from 'react'

/**
 * A plain doum weave, set on the diagonal like the plait inside the emblem.
 * Strips weave themselves in on mount; cells under the pointer lift slightly.
 */
const STRAW = ['#e6d5b3', '#dcc79f', '#d3bb8e', '#e9dcc2', '#cdb07e', '#e2cfa8']

function makeSprite(color, cell, dpr) {
  const c = document.createElement('canvas')
  c.width = c.height = Math.ceil(cell * dpr)
  const g = c.getContext('2d')
  g.scale(dpr, dpr)
  const wid = cell * 0.8
  const y0 = (cell - wid) / 2
  g.fillStyle = color
  g.beginPath()
  g.roundRect(0.5, y0, cell - 1, wid, wid * 0.12)
  g.fill()
  // fibres running along the strip
  for (let k = 0; k < 7; k++) {
    const y = y0 + 3 + (k * (wid - 6)) / 6
    g.strokeStyle = k % 2 ? 'rgba(71,46,30,0.22)' : 'rgba(255,250,235,0.35)'
    g.lineWidth = k % 3 === 0 ? 1.1 : 0.6
    g.beginPath()
    g.moveTo(2, y + Math.sin(k) * 0.6)
    g.lineTo(cell - 2, y - Math.cos(k) * 0.6)
    g.stroke()
  }
  // both ends dip under the crossing strips
  const sh = g.createLinearGradient(0, 0, cell, 0)
  sh.addColorStop(0, 'rgba(46,29,18,0.55)')
  sh.addColorStop(0.22, 'rgba(46,29,18,0)')
  sh.addColorStop(0.78, 'rgba(46,29,18,0)')
  sh.addColorStop(1, 'rgba(46,29,18,0.55)')
  g.fillStyle = sh
  g.fillRect(0, y0, cell, wid)
  return c
}

const hash = (n) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

export default function WeaveCanvas({ cell = 44, circle = false, className = '', duration = 2.2 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, sprites = [], raf = 0
    let start = performance.now()
    const pointer = { x: -1e4, y: -1e4, active: false }
    const lift = new Map()
    let running = true

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      sprites = STRAW.map((c) => makeSprite(c, cell, dpr))
      kick()
    }

    const draw = (now) => {
      const t = reduce ? 1e3 : (now - start) / 1000
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      if (circle) {
        ctx.beginPath()
        ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2)
        ctx.clip()
      }
      ctx.translate(w / 2, h / 2)
      ctx.rotate(Math.PI / 4)

      // pointer in weave space
      const px = pointer.x - w / 2, py = pointer.y - h / 2
      const c = Math.SQRT1_2
      const mx = px * c + py * c, my = -px * c + py * c

      const R = Math.hypot(w, h) / 2 + cell
      const n = Math.ceil(R / cell)
      let busy = t < duration + 0.8

      for (let i = -n; i <= n; i++) {
        for (let j = -n; j <= n; j++) {
          const x = i * cell, y = j * cell
          if (Math.abs(x) > R || Math.abs(y) > R) continue
          const delay = ((i - j + 2 * n) / (4 * n)) * duration
          let p = Math.min(1, Math.max(0, (t - delay) / 0.7))
          if (p <= 0) continue
          p = 1 - Math.pow(1 - p, 3)

          const horizontal = (i + j) % 2 === 0
          const strip = horizontal ? j : i
          const sprite = sprites[Math.floor(hash(strip + (horizontal ? 0.3 : 17.7)) * sprites.length)]

          const key = i * 1000 + j
          const near = pointer.active && Math.hypot(mx - x - cell / 2, my - y - cell / 2) < cell * 1.6
          const prev = lift.get(key) || 0
          const next = prev + ((near ? 1 : 0) - prev) * 0.18
          if (next > 0.005) { lift.set(key, next); busy = true } else lift.delete(key)

          const s = (0.55 + 0.45 * p) * (1 + next * 0.1)
          ctx.save()
          ctx.translate(x + cell / 2, y + cell / 2)
          if (!horizontal) ctx.rotate(Math.PI / 2)
          ctx.scale(s, s)
          ctx.globalAlpha = p
          ctx.drawImage(sprite, -cell / 2, -cell / 2, cell, cell)
          if (next > 0.01) {
            ctx.globalAlpha = next * 0.22
            ctx.fillStyle = '#fff8e8'
            ctx.fillRect(-cell / 2, -cell * 0.4, cell, cell * 0.8)
          }
          ctx.restore()
        }
      }
      ctx.restore()
      if (busy && running) raf = requestAnimationFrame(draw)
      else raf = 0
    }

    const kick = () => {
      if (!raf && running) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
      kick()
    }
    const onLeave = () => {
      pointer.active = false
      kick()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    // pause drawing while the canvas is off-screen
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      if (running) kick()
    })
    io.observe(canvas)

    resize()
    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [cell, circle, duration])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
