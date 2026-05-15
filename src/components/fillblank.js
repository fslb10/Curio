// Fill-in-the-blank component. Text input with hint button.
// Two-wrong rule applies.

import { Sounds } from '../sounds.js'

function normalize(s) {
  return String(s || '').trim().toLowerCase().replace(/[.,!?]+$/, '')
}

export function renderFillBlank(container, question, onAnswered, wrongCountRef) {
  const card = document.createElement('div')
  card.className = 'question-card'

  const prompt = document.createElement('h3')
  prompt.className = 'question-prompt'
  prompt.textContent = question.question
  card.appendChild(prompt)

  const form = document.createElement('form')
  form.className = 'fillblank-form'
  form.setAttribute('autocomplete', 'off')
  form.addEventListener('submit', e => {
    e.preventDefault()
    submit()
  })

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'fillblank-input'
  input.placeholder = 'Type your answer'
  input.setAttribute('autocomplete', 'off')
  input.setAttribute('autocorrect', 'off')
  input.setAttribute('spellcheck', 'false')
  input.setAttribute('inputmode', 'text')
  input.setAttribute('aria-label', 'Your answer')

  form.appendChild(input)

  const row = document.createElement('div')
  row.className = 'fillblank-row'

  const hintBtn = document.createElement('button')
  hintBtn.type = 'button'
  hintBtn.className = 'btn btn-secondary'
  hintBtn.textContent = 'Hint'

  const submitBtn = document.createElement('button')
  submitBtn.type = 'submit'
  submitBtn.className = 'btn btn-primary'
  submitBtn.textContent = 'Check'

  row.appendChild(hintBtn)
  row.appendChild(submitBtn)
  form.appendChild(row)
  card.appendChild(form)

  const hintSlot = document.createElement('div')
  card.appendChild(hintSlot)

  const feedback = document.createElement('div')
  feedback.className = 'feedback-slot'
  card.appendChild(feedback)
  container.appendChild(card)

  function lockAll() {
    input.disabled = true
    hintBtn.disabled = true
    submitBtn.disabled = true
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

  hintBtn.addEventListener('click', () => {
    Sounds.tap()
    if (!question.hint) return
    hintBtn.disabled = true
    hintSlot.innerHTML = ''
    const h = document.createElement('div')
    h.className = 'fillblank-hint'
    h.innerHTML = `<span class="fillblank-hint-icon" aria-hidden="true">💡</span><span>${question.hint}</span>`
    hintSlot.appendChild(h)
  })

  function submit() {
    if (input.disabled) return
    const guess = normalize(input.value)
    if (!guess) {
      input.focus()
      return
    }
    const expected = normalize(question.blank)
    if (guess === expected) {
      input.classList.remove('is-wrong')
      input.classList.add('is-correct')
      lockAll()
      Sounds.correct()
      showFeedback(true, question.explanation || '')
      onAnswered(true)
      return
    }

    Sounds.wrong()
    input.classList.add('is-wrong')
    setTimeout(() => input.classList.remove('is-wrong'), 450)
    wrongCountRef.count = (wrongCountRef.count || 0) + 1
    if (wrongCountRef.count >= 2) {
      input.value = question.blank
      input.classList.remove('is-wrong')
      input.classList.add('is-correct')
      lockAll()
      showFeedback(false, question.explanation || `The answer was "${question.blank}".`)
      onAnswered(false)
    } else {
      showFeedback(false, 'Not quite. Try once more.')
      input.select()
    }
  }

  setTimeout(() => input.focus(), 50)
}
