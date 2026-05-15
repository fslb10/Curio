// Avatar system. SVG portrait built from a small config.
// Config persists via Storage under "curio.avatar".

import { Storage } from './storage.js'
import { Sounds } from './sounds.js'

export const SKIN_TONES = [
  { id: 'tone1', color: '#FFE0BD' },
  { id: 'tone2', color: '#FFCD94' },
  { id: 'tone3', color: '#EAC086' },
  { id: 'tone4', color: '#C68642' },
  { id: 'tone5', color: '#8D5524' },
  { id: 'tone6', color: '#5C3317' }
]

export const HAIR_COLORS = [
  { id: 'hair1', color: '#2C1810' },
  { id: 'hair2', color: '#8B5A2B' },
  { id: 'hair3', color: '#D4A04C' },
  { id: 'hair4', color: '#C44536' },
  { id: 'hair5', color: '#5E548E' }
]

export const HAIR_STYLES = [
  { id: 'short',  label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'curly',  label: 'Curly' }
]

export const EYE_STYLES = [
  { id: 'open',  label: 'Open' },
  { id: 'happy', label: 'Happy' }
]

export const DEFAULT_AVATAR = {
  skin: 'tone2',
  hair: 'hair1',
  hairStyle: 'short',
  eyes: 'open'
}

let cached = null

export async function loadAvatar() {
  const saved = await Storage.load('curio.avatar')
  cached = saved && typeof saved === 'object'
    ? { ...DEFAULT_AVATAR, ...saved }
    : { ...DEFAULT_AVATAR }
  return cached
}

export async function saveAvatar(config) {
  cached = { ...DEFAULT_AVATAR, ...config }
  await Storage.save('curio.avatar', cached)
  return cached
}

export function getCachedAvatar() {
  return cached || { ...DEFAULT_AVATAR }
}

function colorOf(list, id) {
  const found = list.find(s => s.id === id)
  return found ? found.color : list[0].color
}

function hairPath(style, hairColor) {
  if (style === 'curly') {
    return `
      <circle cx="48" cy="36" r="11" fill="${hairColor}" />
      <circle cx="64" cy="28" r="13" fill="${hairColor}" />
      <circle cx="80" cy="36" r="11" fill="${hairColor}" />
      <circle cx="38" cy="48" r="9" fill="${hairColor}" />
      <circle cx="90" cy="48" r="9" fill="${hairColor}" />
    `
  }
  if (style === 'medium') {
    return `
      <path d="M30 64 Q30 24 64 22 Q98 24 98 64 L98 70 L86 64 L80 70 L72 64 L64 70 L56 64 L48 70 L42 64 L30 70 Z"
            fill="${hairColor}" />
    `
  }
  // short
  return `
    <path d="M34 50 Q34 26 64 24 Q94 26 94 50 L94 56 Q88 44 64 44 Q40 44 34 56 Z"
          fill="${hairColor}" />
  `
}

function eyesPath(style) {
  if (style === 'happy') {
    return `
      <path d="M48 70 Q53 65 58 70" stroke="#2D3436" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M70 70 Q75 65 80 70" stroke="#2D3436" stroke-width="3" fill="none" stroke-linecap="round" />
    `
  }
  // open
  return `
    <circle cx="53" cy="68" r="3.5" fill="#2D3436" />
    <circle cx="75" cy="68" r="3.5" fill="#2D3436" />
    <circle cx="54" cy="67" r="1" fill="#fff" />
    <circle cx="76" cy="67" r="1" fill="#fff" />
  `
}

export function renderAvatarSVG(config) {
  const cfg = { ...DEFAULT_AVATAR, ...(config || {}) }
  const skin = colorOf(SKIN_TONES, cfg.skin)
  const hair = colorOf(HAIR_COLORS, cfg.hair)
  const hairSvg = hairPath(cfg.hairStyle, hair)
  const eyes = eyesPath(cfg.eyes)
  return `
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="64" cy="64" r="62" fill="#EAF6FE" />
      <ellipse cx="64" cy="118" rx="40" ry="14" fill="#1CB0F6" />
      <circle cx="64" cy="68" r="30" fill="${skin}" />
      <ellipse cx="50" cy="80" rx="3" ry="2" fill="rgba(255,107,107,0.3)" />
      <ellipse cx="78" cy="80" rx="3" ry="2" fill="rgba(255,107,107,0.3)" />
      ${eyes}
      <path d="M58 84 Q64 90 70 84" stroke="#2D3436" stroke-width="2.5" fill="none" stroke-linecap="round" />
      ${hairSvg}
    </svg>
  `
}

export function showAvatarPicker(container, onSave, onCancel) {
  const current = { ...getCachedAvatar() }

  function rerender() {
    container.innerHTML = `
      <div class="avatar-preview" id="avatar-preview"></div>

      <div class="avatar-section">
        <h3>Skin</h3>
        <div class="avatar-swatches" id="swatches-skin"></div>
      </div>

      <div class="avatar-section">
        <h3>Hair color</h3>
        <div class="avatar-swatches" id="swatches-hair"></div>
      </div>

      <div class="avatar-section">
        <h3>Hair style</h3>
        <div class="style-pills" id="pills-hair-style"></div>
      </div>

      <div class="avatar-section">
        <h3>Eyes</h3>
        <div class="style-pills" id="pills-eyes"></div>
      </div>

      <div class="avatar-save-row">
        <button class="btn btn-secondary" id="avatar-cancel">Cancel</button>
        <button class="btn btn-primary btn-block" id="avatar-save">Save avatar</button>
      </div>
    `

    container.querySelector('#avatar-preview').innerHTML = renderAvatarSVG(current)

    const skinWrap = container.querySelector('#swatches-skin')
    SKIN_TONES.forEach(s => {
      const b = document.createElement('button')
      b.className = 'swatch' + (s.id === current.skin ? ' is-active' : '')
      b.style.background = s.color
      b.setAttribute('aria-label', `Skin tone ${s.id}`)
      b.addEventListener('click', () => {
        current.skin = s.id
        Sounds.tap()
        rerender()
      })
      skinWrap.appendChild(b)
    })

    const hairWrap = container.querySelector('#swatches-hair')
    HAIR_COLORS.forEach(s => {
      const b = document.createElement('button')
      b.className = 'swatch' + (s.id === current.hair ? ' is-active' : '')
      b.style.background = s.color
      b.setAttribute('aria-label', `Hair color ${s.id}`)
      b.addEventListener('click', () => {
        current.hair = s.id
        Sounds.tap()
        rerender()
      })
      hairWrap.appendChild(b)
    })

    const styleWrap = container.querySelector('#pills-hair-style')
    HAIR_STYLES.forEach(s => {
      const b = document.createElement('button')
      b.className = 'style-pill' + (s.id === current.hairStyle ? ' is-active' : '')
      b.textContent = s.label
      b.addEventListener('click', () => {
        current.hairStyle = s.id
        Sounds.tap()
        rerender()
      })
      styleWrap.appendChild(b)
    })

    const eyeWrap = container.querySelector('#pills-eyes')
    EYE_STYLES.forEach(s => {
      const b = document.createElement('button')
      b.className = 'style-pill' + (s.id === current.eyes ? ' is-active' : '')
      b.textContent = s.label
      b.addEventListener('click', () => {
        current.eyes = s.id
        Sounds.tap()
        rerender()
      })
      eyeWrap.appendChild(b)
    })

    container.querySelector('#avatar-save').addEventListener('click', async () => {
      Sounds.tap()
      await saveAvatar(current)
      if (typeof onSave === 'function') onSave(current)
    })
    container.querySelector('#avatar-cancel').addEventListener('click', () => {
      Sounds.tap()
      if (typeof onCancel === 'function') onCancel()
    })
  }

  rerender()
}
