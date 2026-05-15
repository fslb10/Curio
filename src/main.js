// App bootstrap. Wires up the router, screens, modals, and global UI state.

import '@fontsource/fredoka/400.css'
import '@fontsource/fredoka/600.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'

import './styles/main.css'
import './styles/hub.css'
import './styles/lesson.css'
import './styles/components.css'

import { LESSONS } from './data/lessons.js'
import { Storage } from './storage.js'
import { Sounds, setMuted, isMuted, loadMuted } from './sounds.js'
import { showScreen } from './router.js'
import { renderHub } from './screens/hub.js'
import { startLesson } from './screens/lesson.js'
import { startQuiz } from './screens/quiz.js'
import { renderScore } from './screens/score.js'
import {
  loadAvatar,
  getCachedAvatar,
  renderAvatarSVG,
  showAvatarPicker
} from './avatar.js'

let activeLesson = null

async function init() {
  await loadMuted()
  await loadAvatar()
  paintAvatarSlot()
  paintMuteIcon()
  wireGlobalUI()
  await goHub()
}

async function goHub() {
  showScreen('screen-hub')
  await renderHub({ onPickLesson: lesson => goLesson(lesson) })
}

async function goLesson(lesson) {
  activeLesson = lesson
  showScreen('screen-lesson')
  await startLesson({
    lesson,
    onExit: () => openModal('modal-exit'),
    onComplete: () => goQuiz(lesson)
  })
}

async function goQuiz(lesson) {
  activeLesson = lesson
  showScreen('screen-quiz')
  await startQuiz({
    lesson,
    onExit: () => openModal('modal-exit'),
    onFinish: ({ correctCount, total, stars }) => {
      goScore({ correctCount, total, stars, lessonTitle: lesson.title })
    }
  })
}

function goScore({ correctCount, total, stars, lessonTitle }) {
  showScreen('screen-score')
  renderScore({
    stars,
    correctCount,
    total,
    lessonTitle,
    onReplay: () => activeLesson && goQuiz(activeLesson),
    onHub: () => goHub()
  })
}

function goAvatar() {
  showScreen('screen-avatar')
  const main = document.getElementById('avatar-main')
  if (!main) return
  showAvatarPicker(
    main,
    async () => {
      paintAvatarSlot()
      await goHub()
    },
    () => goHub()
  )
}

function paintAvatarSlot() {
  const slot = document.getElementById('avatar-slot')
  if (!slot) return
  slot.innerHTML = renderAvatarSVG(getCachedAvatar())
}

function paintMuteIcon() {
  const icon = document.getElementById('icon-mute')
  const btn = document.getElementById('btn-mute')
  const muted = isMuted()
  if (icon) icon.innerHTML = muted ? '&#128263;' : '&#128266;'
  if (btn) btn.setAttribute('aria-pressed', muted ? 'true' : 'false')
}

function openModal(id) {
  const m = document.getElementById(id)
  if (m) m.classList.add('is-open')
}
function closeModal(id) {
  const m = document.getElementById(id)
  if (m) m.classList.remove('is-open')
}

function wireGlobalUI() {
  const avatarBtn = document.getElementById('btn-avatar')
  if (avatarBtn) {
    avatarBtn.addEventListener('click', () => {
      Sounds.tap()
      goAvatar()
    })
  }

  const avatarBack = document.getElementById('btn-avatar-back')
  if (avatarBack) {
    avatarBack.addEventListener('click', () => {
      Sounds.tap()
      goHub()
    })
  }

  const muteBtn = document.getElementById('btn-mute')
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      const next = !isMuted()
      setMuted(next)
      paintMuteIcon()
      if (!next) Sounds.tap()
    })
  }

  const gearBtn = document.getElementById('btn-gear')
  if (gearBtn) {
    gearBtn.addEventListener('click', () => {
      Sounds.tap()
      openModal('modal-reset')
    })
  }

  // Exit modal
  const exitCancel = document.getElementById('modal-exit-cancel')
  const exitConfirm = document.getElementById('modal-exit-confirm')
  if (exitCancel) exitCancel.addEventListener('click', () => { Sounds.tap(); closeModal('modal-exit') })
  if (exitConfirm) exitConfirm.addEventListener('click', async () => {
    Sounds.tap()
    closeModal('modal-exit')
    await goHub()
  })

  // Reset modal
  const resetCancel = document.getElementById('modal-reset-cancel')
  const resetConfirm = document.getElementById('modal-reset-confirm')
  if (resetCancel) resetCancel.addEventListener('click', () => { Sounds.tap(); closeModal('modal-reset') })
  if (resetConfirm) resetConfirm.addEventListener('click', async () => {
    Sounds.tap()
    // Wipe all lesson progress.
    for (const l of LESSONS) {
      await Storage.clear(`curio.progress.${l.id}`)
    }
    closeModal('modal-reset')
    await goHub()
  })

  // Click backdrop to close any open modal.
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) m.classList.remove('is-open')
    })
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
