// Lesson screen. Walks the user through cards interleaved with checks.

import { Storage } from '../storage.js'
import { Sounds } from '../sounds.js'
import { renderMCQ } from '../components/mcq.js'
import { renderTF } from '../components/tf.js'
import { renderMatch } from '../components/match.js'
import { renderFillBlank } from '../components/fillblank.js'
import { renderSequence } from '../components/sequence.js'

function progressKey(lessonId) { return `curio.progress.${lessonId}` }

function buildSteps(lesson) {
  // Steps are { type: 'card', cardIndex } or { type: 'check', check }
  // interleaved so each check appears after its afterCard value.
  const steps = []
  for (let i = 0; i < lesson.cards.length; i++) {
    steps.push({ type: 'card', cardIndex: i })
    const checksHere = (lesson.checks || []).filter(c => c.afterCard === i)
    checksHere.forEach(c => steps.push({ type: 'check', check: c }))
  }
  return steps
}

export async function startLesson({ lesson, onExit, onComplete }) {
  const titleEl = document.querySelector('#screen-lesson .lesson-title')
  // Insert title into topbar between exit and progress, only once.
  ensureLessonTitle(lesson)

  const steps = buildSteps(lesson)
  const cardSteps = steps.filter(s => s.type === 'card')
  const totalCards = cardSteps.length

  // Resume support: pick up from last completed card index.
  const stored = (await Storage.load(progressKey(lesson.id))) || {}
  let stepIndex = 0
  if (stored.lastCard != null && stored.lastCard >= 0 && stored.lastCard < lesson.cards.length) {
    // Find the step matching that cardIndex.
    const idx = steps.findIndex(s => s.type === 'card' && s.cardIndex === stored.lastCard)
    if (idx >= 0) stepIndex = idx
  }

  await Storage.save(progressKey(lesson.id), {
    ...stored,
    started: true
  })

  setupSegments(totalCards)

  const body = document.getElementById('lesson-body')

  function render() {
    body.innerHTML = ''
    const step = steps[stepIndex]
    if (!step) return

    updateSegments(stepIndex, steps)

    if (step.type === 'card') {
      renderCardStep(lesson, step.cardIndex)
    } else {
      renderCheckStep(step.check)
    }
  }

  function renderCardStep(lessonObj, cardIndex) {
    const card = lessonObj.cards[cardIndex]
    const wrap = document.createElement('div')
    wrap.className = 'content-card'
    wrap.style.setProperty('--accent', lessonObj.color || '#1CB0F6')
    wrap.innerHTML = `
      ${card.emoji ? `<span class="content-card-emoji" aria-hidden="true">${card.emoji}</span>` : ''}
      <h2 class="content-card-title"></h2>
      <p class="content-card-body"></p>
    `
    wrap.querySelector('.content-card-title').textContent = card.title
    wrap.querySelector('.content-card-body').textContent = card.body
    body.appendChild(wrap)

    const footer = document.createElement('div')
    footer.className = 'lesson-footer'
    const next = document.createElement('button')
    next.className = 'btn btn-primary btn-block'
    next.type = 'button'
    next.textContent = stepIndex === steps.length - 1 ? 'Start the quiz' : 'Continue'
    next.addEventListener('click', async () => {
      Sounds.tap()
      const cur = (await Storage.load(progressKey(lessonObj.id))) || {}
      await Storage.save(progressKey(lessonObj.id), {
        ...cur,
        started: true,
        lastCard: cardIndex
      })
      advance()
    })
    footer.appendChild(next)
    body.appendChild(footer)
  }

  function renderCheckStep(check) {
    const wrongRef = { count: 0 }

    const onAnswered = (_correct) => {
      // Add a Continue button after the question is locked.
      let footer = body.querySelector('.lesson-footer')
      if (!footer) {
        footer = document.createElement('div')
        footer.className = 'lesson-footer'
        const next = document.createElement('button')
        next.className = 'btn btn-primary btn-block'
        next.type = 'button'
        next.textContent = 'Continue'
        next.addEventListener('click', () => {
          Sounds.tap()
          advance()
        })
        footer.appendChild(next)
        body.appendChild(footer)
        // Scroll the footer into view so the user notices it on long questions.
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }

    if (check.type === 'mcq') renderMCQ(body, check, onAnswered, wrongRef)
    else if (check.type === 'tf') renderTF(body, check, onAnswered, wrongRef)
    else if (check.type === 'match') renderMatch(body, check, onAnswered, wrongRef)
    else if (check.type === 'fillblank') renderFillBlank(body, check, onAnswered, wrongRef)
    else if (check.type === 'sequence') renderSequence(body, check, onAnswered, wrongRef)
  }

  function advance() {
    stepIndex++
    if (stepIndex >= steps.length) {
      if (typeof onComplete === 'function') onComplete()
      return
    }
    render()
  }

  // Setup exit button confirms via modal handled in main.js.
  const exitBtn = document.getElementById('btn-exit-lesson')
  if (exitBtn) {
    exitBtn.onclick = () => {
      Sounds.tap()
      if (typeof onExit === 'function') onExit()
    }
  }

  render()
}

function ensureLessonTitle(lesson) {
  const topbar = document.querySelector('#screen-lesson .lesson-topbar')
  if (!topbar) return
  let titleEl = topbar.querySelector('.lesson-title')
  if (!titleEl) {
    titleEl = document.createElement('h2')
    titleEl.className = 'lesson-title'
    // Insert before progress-track or spacer.
    const progress = topbar.querySelector('.progress-track')
    if (progress) topbar.insertBefore(titleEl, progress)
    else topbar.appendChild(titleEl)
  }
  titleEl.textContent = lesson.title
}

function setupSegments(total) {
  const wrap = document.getElementById('lesson-progress-segments')
  if (!wrap) return
  wrap.innerHTML = ''
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div')
    seg.className = 'progress-segment'
    wrap.appendChild(seg)
  }
}

function updateSegments(stepIndex, steps) {
  const wrap = document.getElementById('lesson-progress-segments')
  if (!wrap) return
  // Determine which card index we're on.
  let currentCardIdx = -1
  for (let i = 0; i <= stepIndex; i++) {
    if (steps[i] && steps[i].type === 'card') currentCardIdx = steps[i].cardIndex
  }
  const segs = wrap.querySelectorAll('.progress-segment')
  segs.forEach((seg, i) => {
    seg.classList.remove('is-done', 'is-current')
    if (i < currentCardIdx) seg.classList.add('is-done')
    else if (i === currentCardIdx) seg.classList.add('is-current')
  })
}
