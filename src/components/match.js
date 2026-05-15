// Match component. Click a left tile, then a right tile.
// Correct pair locks. Wrong pair flashes and counts toward two-wrong rule
// (counts at most once total for the question, since multiple wrong picks
// while finishing the puzzle would unfairly fail the user).

import { Sounds } from '../sounds.js'

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function renderMatch(container, question, onAnswered, wrongCountRef) {
  const pairs = question.pairs || []
  const lefts = shuffle(pairs.map((p, i) => ({ idx: i, text: p.left })))
  const rights = shuffle(pairs.map((p, i) => ({ idx: i, text: p.right })))

  const card = document.createElement('div')
  card.className = 'question-card'

  const prompt = document.createElement('h3')
  prompt.className = 'question-prompt'
  prompt.textContent = question.question
  card.appendChild(prompt)

  const grid = document.createElement('div')
  grid.className = 'match-grid'
  card.appendChild(grid)

  const leftCol = document.createElement('div')
  leftCol.className = 'match-col'
  leftCol.innerHTML = '<h4>Item</h4>'
  const leftList = document.createElement('div')
  leftList.className = 'match-col'
  leftCol.appendChild(leftList)

  const rightCol = document.createElement('div')
  rightCol.className = 'match-col'
  rightCol.innerHTML = '<h4>Match</h4>'
  const rightList = document.createElement('div')
  rightList.className = 'match-col'
  rightCol.appendChild(rightList)

  grid.appendChild(leftCol)
  grid.appendChild(rightCol)

  const leftBtns = []
  const rightBtns = []

  let selectedLeft = null
  let selectedRight = null
  let solved = 0
  let failedOnce = false

  const feedback = document.createElement('div')
  feedback.className = 'feedback-slot'
  card.appendChild(feedback)
  container.appendChild(card)

  function tile(text, idx, side) {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = 'match-tile'
    b.textContent = text
    b.dataset.idx = String(idx)
    b.dataset.side = side
    return b
  }

  function lockAll() {
    leftBtns.concat(rightBtns).forEach(b => { b.disabled = true })
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

  function tryMatch() {
    if (!selectedLeft || !selectedRight) return
    const lIdx = parseInt(selectedLeft.dataset.idx, 10)
    const rIdx = parseInt(selectedRight.dataset.idx, 10)
    const lBtn = selectedLeft
    const rBtn = selectedRight
    selectedLeft = null
    selectedRight = null

    if (lIdx === rIdx) {
      lBtn.classList.remove('is-selected')
      rBtn.classList.remove('is-selected')
      lBtn.classList.add('is-flash-correct')
      rBtn.classList.add('is-flash-correct')
      Sounds.correct()
      setTimeout(() => {
        lBtn.classList.remove('is-flash-correct')
        rBtn.classList.remove('is-flash-correct')
        lBtn.classList.add('is-paired')
        rBtn.classList.add('is-paired')
        lBtn.disabled = true
        rBtn.disabled = true
        solved++
        if (solved === pairs.length) {
          lockAll()
          showFeedback(true, question.explanation || '')
          onAnswered(!failedOnce ? true : false)
        }
      }, 320)
    } else {
      lBtn.classList.add('is-flash-wrong')
      rBtn.classList.add('is-flash-wrong')
      Sounds.wrong()
      if (!failedOnce) {
        failedOnce = true
        wrongCountRef.count = (wrongCountRef.count || 0) + 1
      }
      setTimeout(() => {
        lBtn.classList.remove('is-flash-wrong', 'is-selected')
        rBtn.classList.remove('is-flash-wrong', 'is-selected')
      }, 350)
    }
  }

  function selectTile(b) {
    if (b.disabled) return
    Sounds.tap()
    const side = b.dataset.side
    if (side === 'left') {
      if (selectedLeft) selectedLeft.classList.remove('is-selected')
      selectedLeft = b
      b.classList.add('is-selected')
    } else {
      if (selectedRight) selectedRight.classList.remove('is-selected')
      selectedRight = b
      b.classList.add('is-selected')
    }
    if (selectedLeft && selectedRight) tryMatch()
  }

  lefts.forEach(item => {
    const b = tile(item.text, item.idx, 'left')
    b.addEventListener('click', () => selectTile(b))
    leftBtns.push(b)
    leftList.appendChild(b)
  })

  rights.forEach(item => {
    const b = tile(item.text, item.idx, 'right')
    b.addEventListener('click', () => selectTile(b))
    rightBtns.push(b)
    rightList.appendChild(b)
  })
}
