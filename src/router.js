// Tiny router. Shows one screen at a time by toggling .is-active.

const SCREEN_IDS = [
  'screen-hub',
  'screen-avatar',
  'screen-lesson',
  'screen-quiz',
  'screen-score'
]

export function showScreen(id) {
  SCREEN_IDS.forEach(sid => {
    const el = document.getElementById(sid)
    if (!el) return
    if (sid === id) el.classList.add('is-active')
    else el.classList.remove('is-active')
  })
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
}
