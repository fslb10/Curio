// MCQ component. Shuffles options on every render.
// Two-wrong-attempt rule: after 2 wrong answers, mark question wrong and reveal correct.

import { Sounds } from '../sounds.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function renderMCQ(container, question, onAnswered, wrongCountRef) {
  const options = shuffle(question.options || [])
  const labels = ['A', 'B', 'C', 'D', 'E', 'F']

  const card = document.createElement('div')
  card.className = 'question-card'

  const prompt = document.createElement('h3')
  prompt.className = 'question-prompt'
  prompt.textContent = question.question
  card.appendChild(prompt)

  const list = document.createElement('div')
  list.className = 'choice-list'
  card.appendChild(list)

  const buttons = []

  options.forEach((opt, i) => {
    const btn = document.createElement('button')
    btn.className = 'choice'
    btn.type = 'button'
    btn.innerHTML = `<span class="choice-mark">${labels[i] || (i + 1)}</span><span class="choice-text"></span>`
    btn.querySelector('.choice-text').textContent = opt.text

    btn.addEventListener('click', () => {
      if (btn.disabled) return
      Sounds.tap()
      handlePick(opt, btn)
    })

    buttons.push({ btn, opt })
    list.appendChild(btn)
  })

  const feedback = document.createElement('div')
  feedback.className = 'feedback-slot'
  card.appendChild(feedback)

  container.appendChild(card)

  function lockAll() {
    buttons.forEach(({ btn }) => { btn.disabled = true })
  }

  function showCorrect() {
    buttons.forEach(({ btn, opt }) => {
      if (opt.correct) btn.classList.add('is-correct')
    })
  }

  function showFeedback(isCorrect, text) {
    feedback.innerHTML = ''
    const banner = document.createElement('div')
    banner.className = 'feedback-banner ' + (isCorrect ? 'is-correct' : 'is-wrong')
    banner.innerHTML = `
      <span class="feedback-icon">${isCorrect ? '✓' : '✗'}</span>
      <div class="feedback-text">
        <div class="feedback-headline">${isCorrect ? 'Nice work!' : 'Not quite.'}</div>
        <div>${text}</div>
      </div>
    `
    feedback.appendChild(banner)
  }

  function handlePick(opt, btn) {
    if (opt.correct) {
      btn.classList.add('is-correct')
      lockAll()
      Sounds.correct()
      showFeedback(true, question.explanation || '')
      onAnswered(true)
      return
    }

    btn.classList.add('is-wrong')
    btn.disabled = true
    Sounds.wrong()
    wrongCountRef.count = (wrongCountRef.count || 0) + 1

    if (wrongCountRef.count >= 2) {
      lockAll()
      showCorrect()
      showFeedback(false, question.explanation || '')
      onAnswered(false)
    } else {
      showFeedback(false, 'Try once more.')
    }
  }
}
