// True/False component. Same two-wrong rule.

import { Sounds } from '../sounds.js'

export function renderTF(container, question, onAnswered, wrongCountRef) {
  const card = document.createElement('div')
  card.className = 'question-card'

  const prompt = document.createElement('h3')
  prompt.className = 'question-prompt'
  prompt.textContent = question.question
  card.appendChild(prompt)

  const row = document.createElement('div')
  row.className = 'tf-row'
  card.appendChild(row)

  const trueBtn = document.createElement('button')
  trueBtn.type = 'button'
  trueBtn.className = 'tf-btn'
  trueBtn.innerHTML = `<span class="tf-emoji" aria-hidden="true">✓</span><span>True</span>`

  const falseBtn = document.createElement('button')
  falseBtn.type = 'button'
  falseBtn.className = 'tf-btn'
  falseBtn.innerHTML = `<span class="tf-emoji" aria-hidden="true">✗</span><span>False</span>`

  row.appendChild(trueBtn)
  row.appendChild(falseBtn)

  const feedback = document.createElement('div')
  feedback.className = 'feedback-slot'
  card.appendChild(feedback)
  container.appendChild(card)

  function lockAll() {
    trueBtn.disabled = true
    falseBtn.disabled = true
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

  function pick(value, btn) {
    if (btn.disabled) return
    Sounds.tap()
    if (value === question.correct) {
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
      const right = question.correct ? trueBtn : falseBtn
      right.classList.add('is-correct')
      lockAll()
      showFeedback(false, question.explanation || '')
      onAnswered(false)
    } else {
      showFeedback(false, 'Try once more.')
    }
  }

  trueBtn.addEventListener('click', () => pick(true, trueBtn))
  falseBtn.addEventListener('click', () => pick(false, falseBtn))
}
