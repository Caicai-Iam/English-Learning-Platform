import { useEffect, useRef } from 'react'
import './AudioPlayer.css'

function AudioPlayer({
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  playbackRate,
  setPlaybackRate,
  isLooping,
  setIsLooping,
  isSingleLoop,
  setIsSingleLoop,
  currentSentenceIndex,
  setCurrentSentenceIndex,
  sentences,
}) {
  const audioRef = useRef(null)

  // Handle playback rate change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.error('Play error:', err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime)
  }

  const handleLoadedMetadata = (e) => {
    setDuration(e.target.duration)
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleEnded = () => {
    if (isSingleLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(err => console.error('Play error:', err))
      }
    } else if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(err => console.error('Play error:', err))
      }
    } else {
      setIsPlaying(false)
    }
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  const handlePrevSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1)
    }
  }

  const handleNextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1)
    }
  }

  return (
    <div className="audio-player-container">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="player-section">
        <div className="play-controls">
          <button
            className={`btn-play ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlayPause}
            title="Play/Pause"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <div className="progress-container">
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar"
            />
          </div>
        </div>

        <div className="playback-controls">
          <select
            value={playbackRate}
            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
            className="playback-rate-select"
          >
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isSingleLoop}
              onChange={(e) => setIsSingleLoop(e.target.checked)}
            />
            <span className="checkbox-text">单句循环</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isLooping}
              onChange={(e) => setIsLooping(e.target.checked)}
            />
            <span className="checkbox-text">整体循环</span>
          </label>
        </div>
      </div>

      <div className="modes-section">
        <div className="mode-tabs">
          <button className="mode-tab active">模式</button>
          <button className="mode-tab active">字幕</button>
          <button className="mode-tab active">听写</button>
          <button className="mode-tab">创建填空</button>
          <button className="mode-tab">填空练习</button>
        </div>
      </div>

      <div className="sentence-display">
        {sentences.length > 0 && (
          <div className="current-sentence">
            <p className="sentence-text">
              {sentences[currentSentenceIndex]}
            </p>
            <div className="sentence-controls">
              <button
                onClick={handlePrevSentence}
                disabled={currentSentenceIndex === 0}
                className="btn-nav"
              >
                ← 上一句
              </button>
              <span className="sentence-counter">
                {currentSentenceIndex + 1} / {sentences.length}
              </span>
              <button
                onClick={handleNextSentence}
                disabled={currentSentenceIndex === sentences.length - 1}
                className="btn-nav"
              >
                下一句 →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioPlayer
