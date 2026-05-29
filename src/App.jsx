import { useState, useEffect } from 'react'
import TextInput from './components/TextInput'
import AudioPlayer from './components/AudioPlayer'
import DictationPractice from './components/DictationPractice'
import HistoryList from './components/HistoryList'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [voiceGender, setVoiceGender] = useState('female')
  const [sentences, setSentences] = useState([])
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const [isSingleLoop, setIsSingleLoop] = useState(false)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [dictationAnswers, setDictationAnswers] = useState({})
  const [history, setHistory] = useState([])
  const [mode, setMode] = useState('input') // 'input' or 'practice'

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('englishLearningHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Split text into sentences
  const splitSentences = (text) => {
    return text
      .split(/([.!?])/)
      .reduce((acc, curr, i, arr) => {
        if (i % 2 === 0 && curr.trim()) {
          const sentence = curr.trim() + (arr[i + 1] || '')
          acc.push(sentence.trim())
        }
        return acc
      }, [])
      .filter(s => s.length > 0)
  }

  // Generate speech
  const handleGenerateSpeech = async () => {
    if (!textInput.trim()) {
      alert('Please enter some text')
      return
    }

    const sentenceList = splitSentences(textInput)
    setSentences(sentenceList)
    setDictationAnswers({})
    setCurrentSentenceIndex(0)
    setCurrentTime(0)

    // Create audio blob from sentences
    try {
      const utterances = sentenceList.map((sentence) => {
        return new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(sentence)
          utterance.lang = 'en-US'
          utterance.pitch = voiceGender === 'female' ? 1.2 : 0.8
          utterance.rate = 0.9
          utterance.onend = () => resolve()
          speechSynthesis.speak(utterance)
        })
      })

      // For demo, we'll create a mock audio context
      // In production, you'd record actual audio
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const buffer = audioContext.createBuffer(1, 44100 * 5, 44100) // 5 seconds of silence as placeholder
      const audioBlob = bufferToWave(buffer)
      const audioUrl = URL.createObjectURL(audioBlob)

      setCurrentAudio(audioUrl)
      setMode('practice')

      // Save to history
      const record = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        content: textInput.slice(0, 100) + (textInput.length > 100 ? '...' : ''),
        fullContent: textInput,
        sentences: sentenceList,
      }

      const updatedHistory = [record, ...history]
      setHistory(updatedHistory)
      localStorage.setItem('englishLearningHistory', JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('Error generating speech:', error)
      alert('Failed to generate speech')
    }
  }

  // Convert audio buffer to WAV
  const bufferToWave = (buffer) => {
    const length = buffer.length * buffer.numberOfChannels * 2 + 44
    const arrayBuffer = new ArrayBuffer(length)
    const view = new Uint8Array(arrayBuffer)
    const channels = []
    let offset = 0
    let pos = 0

    // Write WAV header
    const setUint16 = (data) => {
      view[offset] = data & 0xff
      view[offset + 1] = (data >> 8) & 0xff
      offset += 2
    }
    const setUint32 = (data) => {
      view[offset] = data & 0xff
      view[offset + 1] = (data >> 8) & 0xff
      view[offset + 2] = (data >> 16) & 0xff
      view[offset + 3] = (data >> 24) & 0xff
      offset += 4
    }

    setUint32(0x46464952) // 'RIFF'
    setUint32(length - 8) // file length - 8
    setUint32(0x45564157) // 'WAVE'
    setUint32(0x20746d66) // 'fmt '
    setUint32(16) // chunk length
    setUint16(1) // compression code
    setUint16(buffer.numberOfChannels)
    setUint32(buffer.sampleRate)
    setUint32(buffer.sampleRate * 2 * buffer.numberOfChannels) // avg. bytes/sec
    setUint16(buffer.numberOfChannels * 2) // block-align
    setUint16(16) // 16-bit
    setUint32(0x61746164) // 'data'
    setUint32(length - pos - 4) // chunk length

    return new Blob([arrayBuffer], { type: 'audio/wav' })
  }

  const handleLoadHistory = (item) => {
    setTextInput(item.fullContent)
    setSentences(item.sentences)
    setCurrentSentenceIndex(0)
    setDictationAnswers({})
    setMode('practice')
  }

  const handleDeleteHistory = (id) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem('englishLearningHistory', JSON.stringify(updated))
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <h1>English Learning Platform</h1>
        </div>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={setIsDarkMode} />
      </header>

      <main className="app-main">
        {mode === 'input' ? (
          <div className="input-section">
            <TextInput
              textInput={textInput}
              setTextInput={setTextInput}
              voiceGender={voiceGender}
              setVoiceGender={setVoiceGender}
              onGenerateSpeech={handleGenerateSpeech}
            />
          </div>
        ) : (
          <div className="practice-section">
            <div className="practice-header">
              <h2>Practice</h2>
              <button
                className="btn-back"
                onClick={() => {
                  setMode('input')
                  setCurrentAudio(null)
                }}
              >
                ← Back
              </button>
            </div>

            <AudioPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              duration={duration}
              setDuration={setDuration}
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
              isLooping={isLooping}
              setIsLooping={setIsLooping}
              isSingleLoop={isSingleLoop}
              setIsSingleLoop={setIsSingleLoop}
              currentSentenceIndex={currentSentenceIndex}
              setCurrentSentenceIndex={setCurrentSentenceIndex}
              sentences={sentences}
            />

            <DictationPractice
              sentences={sentences}
              dictationAnswers={dictationAnswers}
              setDictationAnswers={setDictationAnswers}
              currentSentenceIndex={currentSentenceIndex}
            />
          </div>
        )}

        <HistoryList
          history={history}
          onLoad={handleLoadHistory}
          onDelete={handleDeleteHistory}
        />
      </main>
    </div>
  )
}

export default App
