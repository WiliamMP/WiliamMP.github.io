import { useEffect, useRef } from 'react'

const SPACING = 28
const MOUSE_RADIUS = 220
const RIPPLE_SPEED = 0.6 // px por ms
const RIPPLE_WIDTH = 70
const RIPPLE_LIFE = 1800 // ms

type Ripple = { x: number; y: number; start: number }

function readColors() {
  const styles = getComputedStyle(document.documentElement)
  return {
    accent: styles.getPropertyValue('--accent').trim() || '#5ab8e8',
    dot: styles.getPropertyValue('--muted').trim() || '#a1a1aa',
  }
}

// Grade de pontos em canvas: uma onda passa pela tela, os pontos reagem ao
// cursor e cada clique solta uma onda de choque.
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const colorScheme = window.matchMedia('(prefers-color-scheme: light)')

    let colors = readColors()
    let width = 0
    let height = 0
    let frame = 0
    const mouse = { x: -9999, y: -9999, active: false }
    const ripples: Ripple[] = []

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height)

      // Remove ondas que já terminaram
      while (ripples.length && time - ripples[0].start > RIPPLE_LIFE) ripples.shift()

      const still = reduceMotion.matches
      const t = still ? 0 : time

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          // Onda base que atravessa a tela na diagonal
          const wave = Math.sin(x * 0.012 + y * 0.008 - t * 0.0011) * Math.cos(y * 0.01 - t * 0.0007)
          let size = 0.8 + (wave + 1) * 1.0
          let alpha = 0.06 + (wave + 1) * 0.22
          let glow = 0
          let dx = 0
          let dy = 0

          // Cursor empurra e acende os pontos próximos
          if (mouse.active) {
            const mx = x - mouse.x
            const my = y - mouse.y
            const dist = Math.hypot(mx, my)
            if (dist < MOUSE_RADIUS) {
              const force = 1 - dist / MOUSE_RADIUS
              const push = force * force * 22
              dx += (mx / (dist || 1)) * push
              dy += (my / (dist || 1)) * push
              glow = Math.max(glow, force)
            }
          }

          // Ondas de choque dos cliques
          for (const ripple of ripples) {
            const age = time - ripple.start
            const radius = age * RIPPLE_SPEED
            const rx = x - ripple.x
            const ry = y - ripple.y
            const dist = Math.hypot(rx, ry)
            const band = 1 - Math.abs(dist - radius) / RIPPLE_WIDTH
            if (band > 0) {
              const fade = 1 - age / RIPPLE_LIFE
              const strength = band * fade
              dx += (rx / (dist || 1)) * strength * 16
              dy += (ry / (dist || 1)) * strength * 16
              glow = Math.max(glow, strength)
            }
          }

          size += glow * 3
          alpha += glow * 0.75

          ctx!.globalAlpha = Math.min(alpha, 1)
          ctx!.fillStyle = glow > 0.05 ? colors.accent : colors.dot
          ctx!.beginPath()
          ctx!.arc(x + dx, y + dy, size / 2 + 0.4, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
      ctx!.globalAlpha = 1
    }

    function loop(time: number) {
      draw(time)
      frame = requestAnimationFrame(loop)
    }

    function start() {
      cancelAnimationFrame(frame)
      if (reduceMotion.matches) draw(0)
      else frame = requestAnimationFrame(loop)
    }

    function onPointerMove(e: PointerEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = e.pointerType === 'mouse'
      if (reduceMotion.matches) draw(0)
    }

    function onPointerLeave() {
      mouse.active = false
    }

    function onPointerDown(e: PointerEvent) {
      if (reduceMotion.matches) return
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() })
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(frame)
      else start()
    }

    function onScheme() {
      colors = readColors()
      if (reduceMotion.matches) draw(0)
    }

    function onResize() {
      resize()
      if (reduceMotion.matches) draw(0)
    }

    resize()
    start()

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)
    colorScheme.addEventListener('change', onScheme)
    reduceMotion.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      colorScheme.removeEventListener('change', onScheme)
      reduceMotion.removeEventListener('change', start)
    }
  }, [])

  return (
    <div className="background" aria-hidden="true">
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <canvas ref={canvasRef} />
    </div>
  )
}
