let selectedVoice: SpeechSynthesisVoice | null = null

const loadVoices = () => {
  const voices = speechSynthesis.getVoices()
  selectedVoice =
    voices.find((voice) => voice.name === 'Google 한국의' && voice.lang === 'ko-KR') || null
}

speechSynthesis.onvoiceschanged = loadVoices

export const speak = (text: string) => {
  if (typeof window === 'undefined') return

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'ko-KR'
  utter.voice = selectedVoice
  utter.rate = 0.95
  utter.pitch = 1
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utter)
}
