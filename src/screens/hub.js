// Hub screen. Renders lesson cards and progress info.

import { LESSONS } from '../data/lessons.js'
import { Storage } from '../storage.js'
import { Sounds } from '../sounds.js'

function progressKey(lessonId) { return `curio.progress.${lessonId}` }

export async function renderHub({ onPickLesson }) {
  const grid = document.getElementById('lesson-grid')
  if (!grid) return
  grid.innerHTML = ''

  for (let i = 0; i < LESSONS.length; i++) {
    const lesson = LESSONS[i]
    const progress = (await Storage.load(progressKey(lesson.id))) || {}
    const stars = Math.max(0, Math.min(3, progress.stars || 0))
    const completed = !!progress.completed
    const started = !!progress.started

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'lesson-card'
    btn.style.setProperty('--accent', lesson.color || '#1CB0F6')
    btn.style.animationDelay = `${i * 80}ms`

    const starsHtml = [0, 1, 2].map(idx => {
      const on = idx < stars
      return `<span class="star${on ? ' is-on' : ''}" aria-hidden="true">★</span>`
    }).join('')

    let badge = ''
    if (completed) {
      badge = `<span class="lesson-card-badge is-done">Done</span>`
    } else if (started) {
      badge = `<span class="lesson-card-badge">In progress</span>`
    } else {
      badge = `<span class="lesson-card-badge is-new">New</span>`
    }

    btn.innerHTML = `
      <div class="lesson-card-row">
        <div class="lesson-card-emoji" aria-hidden="true">${lesson.emoji || '📘'}</div>
        <div class="lesson-card-info">
          <div class="lesson-card-title"></div>
          <div class="lesson-card-desc"></div>
          <div class="lesson-card-meta">
            <div class="lesson-card-stars" aria-label="Stars earned">${starsHtml}</div>
            ${badge}
          </div>
        </div>
      </div>
    `
    btn.querySelector('.lesson-card-title').textContent = lesson.title
    btn.querySelector('.lesson-card-desc').textContent = lesson.description

    btn.addEventListener('click', () => {
      Sounds.tap()
      if (typeof onPickLesson === 'function') onPickLesson(lesson)
    })

    grid.appendChild(btn)
  }
}
