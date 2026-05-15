// Quiz screen. Walks through the lesson's quiz array.

import { Storage } from '../storage.js'
import { Sounds } from '../sounds.js'
import { renderMCQ } from '../components/mcq.js'
import { renderTF } from '../components/tf.js'
import { renderMatch } from '../components/match.js'
import { renderFillBlank } from '../components/fillblank.js'
import { renderSequence } from '../components/sequence.js'

function progressKey(lessonId) { return `curio.progress.${lessonId}` }

export async function startQuiz({ lesson, onExit, onFinish }) {
  const total = (lesson.quiz || []).length
  let index = 0
  let correctCount = 0

  const body = document.getElementById('quiz-body')
  const fill = document.getElementById('quiz-progress-fill')
  const label = document.getElementById('quiz-progress-label')
  const exitBtn = document.getElementById('btn-exit-quiz')

  if (exitBtn) {
    exitBtn.onclick = () => {
      Sounds.tap()
      if (typeof onExit === 'function') onExit()
    }
  }

  function updateProgress() {
    if (fill) fill.style.width = `${Math.round((index / total) * 100)}%`
    if (label) label.textContent = `${Math.min(index + 1, total)}/${total}`
  }

  function render() {
    body.innerHTML = ''
    updateProgress()
    if (index >= total) {
      finish()
      return
    }
    const q = lesson.quiz[index]
    const wrongRef = { count: 0 }

    const onAnswered = (isCorrect) => {
      if (isCorrect) correctCount++

      let footer = body.querySelector('.lesson-footer')
      if (!footer) {
        footer = document.createElement('div')
        footer.className = 'lesson-footer'
        const next = document.createElement('button')
        next.className = 'btn btn-primary btn-block'
        next.type = 'button'
        next.textContent = index === total - 1 ? 'See your score' : 'Next question'
        next.addEventListener('click', () => {
          Sounds.tap()
          index++
          if (fill) fill.style.width = `${Math.round((index / total) * 100)}%`
          if (label) label.textContent = `${Math.min(index + 1, total)}/${total}`
          render()
        })
        footer.appendChild(next)
        body.appendChild(footer)
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }

    if (q.type === 'mcq') renderMCQ(body, q, onAnswered, wrongRef)
    else if (q.type === 'tf') renderTF(body, q, onAnswered, wrongRef)
    else if (q.type === 'match') renderMatch(body, q, onAnswered, wrongRef)
    else if (q.type === 'fillblank') renderFillBlank(body, q, onAnswered, wrongRef)
    else if (q.type === 'sequence') renderSequence(body, q, onAnswered, wrongRef)
  }

  async function finish() {
    const stars = computeStars(correctCount, total)
    const cur = (await Storage.load(progressKey(lesson.id))) || {}
    const prevStars = cur.stars || 0
    await Storage.save(progressKey(lesson.id), {
      ...cur,
      completed: true,
      started: true,
      stars: Math.max(prevStars, stars),
      lastScore: { correct: correctCount, total }
    })
    if (typeof onFinish === 'function') {
      onFinish({ correctCount, total, stars })
    }
  }

  render()
}

function computeStars(correct, total) {
  if (total === 0) return 0
  const ratio = correct / total
  if (ratio >= 0.9) return 3
  if (ratio >= 0.7) return 2
  if (ratio >= 0.5) return 1
  return 0
}
