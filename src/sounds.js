// Sounds. Tiny tone generator using Web Audio API. No assets needed.
// Mute state is persisted by main.js via Storage.

import { Storage } from './storage.js'

let ctx = null
let muted = false

function getCtx() {
  if (!ctx) {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  return ctx
}

function tone(freq, start, duration, volume = 0.28) {
  const c = getCtx()
  if (!c) return
  if (c.state === 'suspended') {
    try { c.resume() } catch {}
  }
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  osc.connect(gain)
  gain.connect(c.destination)
  const t0 = c.currentTime + start
  gain.gain.setValueAtTime(volume, t0)
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

export function setMuted(val) {
  muted = !!val
  Storage.save('curio.muted', muted)
}

export function isMuted() { return muted }

export async function loadMuted() {
  const v = await Storage.load('curio.muted')
  muted = !!v
  return muted
}

export const Sounds = {
  correct() {
    if (muted) return
    tone(523, 0, 0.15)
    tone(659, 0.15, 0.2)
  },
  wrong() {
    if (muted) return
    tone(349, 0, 0.2, 0.2)
  },
  complete() {
    if (muted) return
    tone(523, 0, 0.15)
    tone(659, 0.15, 0.15)
    tone(784, 0.3, 0.25)
  },
  tap() {
    if (muted) return
    tone(440, 0, 0.06, 0.1)
  }
}
