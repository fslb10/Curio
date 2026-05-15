// Lightweight canvas confetti. No dependencies.

let canvas = null
let ctx = null
let pieces = []
let raf = null
let running = false

function ensureCanvas() {
  if (canvas) return
  canvas = document.getElementById('confetti-canvas')
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
}

function resize() {
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const COLORS = ['#1CB0F6', '#58CC02', '#FFC200', '#FF6B6B', '#A569FF', '#FF8FB1']

function rand(min, max) { return Math.random() * (max - min) + min }

function spawnBurst(count) {
  const W = window.innerWidth
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: rand(0, W),
      y: rand(-40, -10),
      vx: rand(-2, 2),
      vy: rand(2, 5),
      g: rand(0.04, 0.12),
      size: rand(6, 12),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.2, 0.2),
      life: rand(2.5, 4.5),
      shape: Math.random() < 0.5 ? 'rect' : 'circle'
    })
  }
}

function step() {
  if (!ctx || !canvas) { running = false; return }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  const H = window.innerHeight
  for (const p of pieces) {
    p.vy += p.g
    p.x += p.vx
    p.y += p.vy
    p.rot += p.vr
    p.life -= 0.016
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rot)
    ctx.fillStyle = p.color
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5)
    } else {
      ctx.beginPath()
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }
  pieces = pieces.filter(p => p.life > 0 && p.y < H + 50)
  if (pieces.length > 0) {
    raf = requestAnimationFrame(step)
  } else {
    running = false
    if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  }
}

export function fireConfetti(level = 2) {
  ensureCanvas()
  if (!ctx) return
  const total = level >= 3 ? 140 : 90
  spawnBurst(total)
  if (level >= 3) {
    setTimeout(() => spawnBurst(60), 250)
    setTimeout(() => spawnBurst(50), 600)
  } else {
    setTimeout(() => spawnBurst(40), 250)
  }
  if (!running) {
    running = true
    raf = requestAnimationFrame(step)
  }
}

export function clearConfetti() {
  pieces = []
  if (raf) cancelAnimationFrame(raf)
  if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  running = false
}
