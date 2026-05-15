// Score screen. Shows stars, fraction, and confetti for 2+ stars.

import { Sounds } from '../sounds.js'
import { fireConfetti, clearConfetti } from '../confetti.js'

export function renderScore({ stars, correctCount, total, lessonTitle, onReplay, onHub }) {
  const titleEl = document.getElementById('score-title')
  const subEl = document.getElementById('score-subtitle')
  const fractionEl = document.getElementById('score-fraction')
  const starsEl = document.getElementById('score-stars')
  const emojiEl = document.getElementById('score-emoji')

  let headline = 'Good try!'
  let subtitle = 'Keep going. Try again to earn more stars.'
  let emoji = '🌱'
  if (stars >= 3) {
    headline = 'Perfect!'
    subtitle = `You aced ${lessonTitle}.`
    emoji = '🌟'
  } else if (stars === 2) {
    headline = 'Great job!'
    subtitle = `You finished ${lessonTitle} with two stars.`
    emoji = '🎉'
  } else if (stars === 1) {
    headline = 'Nice start!'
    subtitle = `You finished ${lessonTitle}. Try once more for more stars.`
    emoji = '👍'
  }

  if (titleEl) titleEl.textContent = headline
  if (subEl) subEl.textContent = subtitle
  if (emojiEl) emojiEl.textContent = emoji
  if (fractionEl) fractionEl.textContent = `${correctCount} of ${total} correct`

  if (starsEl) {
    starsEl.innerHTML = ''
    for (let i = 0; i < 3; i++) {
      const s = document.createElement('span')
      s.className = 'star' + (i < stars ? ' is-on' : '')
      s.textContent = '★'
      starsEl.appendChild(s)
    }
  }

  const replayBtn = document.getElementById('btn-score-replay')
  const hubBtn = document.getElementById('btn-score-hub')
  if (replayBtn) {
    replayBtn.onclick = () => {
      Sounds.tap()
      clearConfetti()
      if (typeof onReplay === 'function') onReplay()
    }
  }
  if (hubBtn) {
    hubBtn.onclick = () => {
      Sounds.tap()
      clearConfetti()
      if (typeof onHub === 'function') onHub()
    }
  }

  // Effects
  Sounds.complete()
  if (stars >= 2) {
    setTimeout(() => fireConfetti(stars), 150)
  }
}
