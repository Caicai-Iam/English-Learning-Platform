import './TextInput.css'

function TextInput({
  textInput,
  setTextInput,
  voiceGender,
  setVoiceGender,
  onGenerateSpeech,
}) {
  return (
    <div className="text-input-container">
      <div className="input-header">
        <h2>输入文本</h2>
        <div className="help-icon">?</div>
      </div>

      <textarea
        className="text-input-field"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Paste or type your English text here..."
      />

      <div className="input-controls">
        <div className="voice-selector">
          <label>选择音色</label>
          <select
            value={voiceGender}
            onChange={(e) => setVoiceGender(e.target.value)}
            className="gender-select"
          >
            <option value="female">女 · heart</option>
            <option value="male">男 · heart</option>
          </select>
        </div>
      </div>

      <button className="btn-generate" onClick={onGenerateSpeech}>
        生成音频与字幕
      </button>

      <div className="status-text">准备生成音频...</div>
    </div>
  )
}

export default TextInput
