import './DictationPractice.css'

function DictationPractice({
  sentences,
  dictationAnswers,
  setDictationAnswers,
  currentSentenceIndex,
}) {
  const handleAnswerChange = (index, value) => {
    setDictationAnswers({
      ...dictationAnswers,
      [index]: value,
    })
  }

  const handleClear = () => {
    setDictationAnswers({})
  }

  return (
    <div className="dictation-practice-container">
      <div className="dictation-header">
        <h3>练习</h3>
        <div className="help-icon">?</div>
      </div>

      <div className="dictation-content">
        {sentences.length === 0 ? (
          <p className="no-content">Generate audio first to start practicing</p>
        ) : (
          <>
            {sentences.map((sentence, index) => (
              <div
                key={index}
                className={`dictation-item ${index === currentSentenceIndex ? 'active' : ''}`}
              >
                <label className="dictation-label">
                  第 {index + 1} 句听写...
                </label>
                <textarea
                  className="dictation-input"
                  value={dictationAnswers[index] || ''}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Listen and type sentence ${index + 1}...`}
                />
                <div className="answer-preview">
                  <small>{sentence}</small>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="dictation-footer">
        <button className="btn-clear" onClick={handleClear}>
          清空
        </button>
      </div>
    </div>
  )
}

export default DictationPractice
