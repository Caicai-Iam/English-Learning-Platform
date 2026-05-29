import './ThemeToggle.css'

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <div className="theme-toggle-container">
      <button
        className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}
        onClick={() => onToggle(!isDarkMode)}
        title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </button>
    </div>
  )
}

export default ThemeToggle
