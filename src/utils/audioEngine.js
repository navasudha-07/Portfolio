// ============================================================
// AUDIO ENGINE — Native Web Audio API Tank Ambience & Glass Knock
// ============================================================

let audioCtx = null
let ambientGain = null
let isMuted = true
let isInitialized = false

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function initAudio() {
  const ctx = getAudioContext()
  if (!ctx || isInitialized) return
  isInitialized = true
}

export function toggleAudio() {
  const ctx = getAudioContext()
  if (!ctx) return false

  isMuted = !isMuted
  if (!isMuted) {
    startAmbience()
    playBubblePop(520)
  } else {
    stopAmbience()
  }
  return !isMuted
}

export function getAudioState() {
  return !isMuted
}

export function startAmbience() {
  const ctx = getAudioContext()
  if (!ctx || isMuted) return

  try {
    if (ambientGain) {
      ambientGain.gain.setValueAtTime(0.045, ctx.currentTime)
      return
    }

    // Sub-bass underwater drone
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    ambientGain = ctx.createGain()

    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(55, ctx.currentTime) // A1 drone

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(82.4, ctx.currentTime) // E2 drone

    // Lowpass filter simulating water muffling
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(240, ctx.currentTime)
    filter.Q.setValueAtTime(3, ctx.currentTime)

    ambientGain.gain.setValueAtTime(0.04, ctx.currentTime)

    osc1.connect(filter)
    osc2.connect(filter)
    filter.connect(ambientGain)
    ambientGain.connect(ctx.destination)

    osc1.start()
    osc2.start()

    // Gentle LFO filter sweep (underwater tidal motion)
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime)
    lfoGain.gain.setValueAtTime(60, ctx.currentTime)
    lfo.connect(filter.frequency)
    lfo.start()
  } catch (e) {
    console.warn('Audio ambience failed:', e)
  }
}

export function stopAmbience() {
  const ctx = getAudioContext()
  if (!ctx || !ambientGain) return
  try {
    ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.1)
  } catch (e) {
    // ignore
  }
}

// Realistic glass knock sound (knocking on thick aquarium glass)
export function playKnockSound() {
  const ctx = getAudioContext()
  if (!ctx || isMuted) return

  try {
    const now = ctx.currentTime

    // High impact tap
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    clickOsc.type = 'sine'
    clickOsc.frequency.setValueAtTime(840, now)
    clickOsc.frequency.exponentialRampToValueAtTime(140, now + 0.08)

    clickGain.gain.setValueAtTime(0.25, now)
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

    clickOsc.connect(clickGain)
    clickGain.connect(ctx.destination)

    clickOsc.start(now)
    clickOsc.stop(now + 0.1)

    // Resonant glass body ring
    const bodyOsc = ctx.createOscillator()
    const bodyGain = ctx.createGain()
    const bandpass = ctx.createBiquadFilter()

    bodyOsc.type = 'triangle'
    bodyOsc.frequency.setValueAtTime(420, now)

    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(520, now)
    bandpass.Q.setValueAtTime(6, now)

    bodyGain.gain.setValueAtTime(0.18, now)
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)

    bodyOsc.connect(bandpass)
    bandpass.connect(bodyGain)
    bodyGain.connect(ctx.destination)

    bodyOsc.start(now)
    bodyOsc.stop(now + 0.3)
  } catch (e) {
    // audio error handling
  }
}

// Play bubbly aquatic bloop (creature click, pearl hover)
export function playBubblePop(freq = 480) {
  const ctx = getAudioContext()
  if (!ctx || isMuted) return

  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 0.7, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.12)

    gain.gain.setValueAtTime(0.14, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.15)
  } catch (e) {
    // audio error handling
  }
}

// Entering tank plunge sound
export function playDiveSound() {
  const ctx = getAudioContext()
  if (!ctx || isMuted) return

  try {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const filter = ctx.createBiquadFilter()
    const gain = ctx.createGain()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(260, now)
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.6)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.6)

    gain.gain.setValueAtTime(0.2, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.7)
  } catch (e) {
    // audio error handling
  }
}
