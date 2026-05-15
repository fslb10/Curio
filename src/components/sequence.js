// Sequence component. Click items in the bank to add them to the order.
// Click an item in the order to remove it. Submit with Check button.
// Two-wrong rule applies.

import { Sounds } from '../sounds.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function renderSequence(container, question, onAnswered, wrongCountRef) {
  const items = question.items || []
  const correct = question.correct || []

  const card = document.createElement('div')
  card.className = 'question-card'

  const prompt = document.createElement('h3')
  prompt.className = 'question-prompt'
  prompt.textContent = question.question
  card.appendChild(prompt)

  const wrap = document.createElement('div')
  wrap.className = 'sequence-wrap'

  const orderSection = document.createElement('div')
  orderSection.className = 'sequence-section'
  orderSection.innerHTML = '<h4>Your order</h4>'
  const orderList = document.createElement('div')
  orderList.className = 'sequence-list is-empty'
  orderSection.appendChild(orderList)

  const bankSection = document.createElement('div')
  bankSection.className = 'sequence-section'
  bankSection.innerHTML = '<h4>Choices</h4>'
  const bankList = document.createElement('div')
  bankList.className = 'sequence-list'
  bankSection.appendChild(bankList)

  wrap.appendChild(orderSection)
  wrap.appendChild(bankSection)
  card.appendChild(wrap)

  const actions = document.createElement('div')
  actions.className = 'fillblank-row'
  actions.style.marginTop = '14px'

  const resetBtn = document.createElement('button')
  resetBtn.type = 'button'
  resetBtn.className = 'btn btn-secondary'
  resetBtn.textContent = 'Reset'

  const checkBtn = document.createElement('button')
  checkBtn.type = 'button'
  checkBtn.className = 'btn btn-primary'
  checkBtn.textContent = 'Check'
  checkBtn.disabled = true

  actions.appendChild(resetBtn)
  actions.appendChild(checkBtn)
  card.appendChild(actions)

  const feedback = document.createElement('div')
  feedback.className = 'feedback-slot'
  card.appendChild(feedback)
  container.appendChild(card)

  const shuffled = shuffle(items.map((text, idx) => ({ idx, text })))
  let order = []
  let locked = false

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

  function rerender() {
    bankList.innerHTML = ''
    orderList.innerHTML = ''

    if (order.length === 0) {
      orderList.classList.add('is-empty')
    } else {
      orderList.classList.remove('is-empty')
    }

    order.forEach((it, pos) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'sequence-item'
      b.innerHTML = `<span class="sequence-num">${pos + 1}</span><span class="sequence-text"></span>`
      b.querySelector('.sequence-text').textContent = it.text
      if (locked) b.disabled = true
      b.addEventListener('click', () => {
        if (locked) return
        Sounds.tap()
        order = order.filter(o => o !== it)
        rerender()
      })
      orderList.appendChild(b)
    })

    const orderedSet = new Set(order.map(o => o.idx))
    shuffled.forEach(it => {
      if (orderedSet.has(it.idx)) return
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'sequence-item'
      b.innerHTML = `<span class="sequence-num">+</span><span class="sequence-text"></span>`
      b.querySelector('.sequence-text').textContent = it.text
      if (locked) b.disabled = true
      b.addEventListener('click', () => {
        if (locked) return
        Sounds.tap()
        order.push(it)
        rerender()
      })
      bankList.appendChild(b)
    })

    checkBtn.disabled = locked || order.length !== items.length
    resetBtn.disabled = locked || order.length === 0
  }

  function lockAll() {
    locked = true
    rerender()
  }

  function showCorrectColors() {
    orderList.querySelectorAll('.sequence-item').forEach((node, i) => {
      const expected = correct[i]
      const actual = order[i] ? order[i].idx : -1
      if (expected === actual) node.classList.add('is-correct')
      else node.classList.add('is-wrong')
    })
  }

  function showAllCorrect() {
    orderList.querySelectorAll('.sequence-item').forEach(node => {
      node.classList.add('is-correct')
    })
  }

  resetBtn.addEventListener('click', () => {
    if (locked) return
    Sounds.tap()
    order = []
    rerender()
  })

  checkBtn.addEventListener('click', () => {
    if (locked) return
    if (order.length !== items.length) return
    Sounds.tap()
    const isRight = order.every((it, i) => it.idx === correct[i])
    if (isRight) {
      Sounds.correct()
      showAllCorrect()
      lockAll()
      showFeedback(true, question.explanation || '')
      onAnswered(true)
      return
    }
    Sounds.wrong()
    showCorrectColors()
    wrongCountRef.count = (wrongCountRef.count || 0) + 1
    if (wrongCountRef.count >= 2) {
      // Show the correct order, then call onAnswered(false).
      const correctOrder = correct.map(idx => items[idx])
      order = correctOrder.map((text, i) => ({ idx: correct[i], text }))
      lockAll()
      showAllCorrect()
      showFeedback(false, question.explanation || '')
      onAnswered(false)
    } else {
      showFeedback(false, 'Some are out of place. Try again.')
      // After a moment, clear the wrong colors so the user can keep trying.
      setTimeout(() => {
        orderList.querySelectorAll('.sequence-item').forEach(node => {
          node.classList.remove('is-correct', 'is-wrong')
        })
      }, 900)
    }
  })

  rerender()
}
