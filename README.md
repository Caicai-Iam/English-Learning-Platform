# English Learning Platform

A powerful, local-first English learning web application inspired by OIO Lab. Learn English with interactive audio, transcriptions, and dictation practice.

## Features

✨ **Core Features:**
- 📝 Text input with speech synthesis
- 🎵 Audio player with playback controls
- 📊 Sentence-by-sentence navigation
- ✍️ Interactive dictation practice
- 🔄 Playback speed control (0.75x, 1x, 1.5x, 2x)
- 🔁 Single sentence and full loop modes
- 💾 Local data persistence with localStorage
- 🌙 Dark/Light theme toggle
- 📱 Fully responsive design
- 💾 Save, download, and manage learning history

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Caicai-Iam/English-Learning-Platform.git
cd English-Learning-Platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Usage

### 1. Input Text
- Paste or type your English text in the text input area
- Select your preferred voice (Male/Female)
- Click "生成音频与字幕" (Generate Audio)

### 2. Practice
- Use the audio player to listen to the content
- Adjust playback speed as needed
- Enable loop modes for focused practice
- Navigate between sentences

### 3. Dictation
- Listen to each sentence
- Type what you hear in the dictation boxes
- Compare with the original text

### 4. History
- View all your previous learning sessions
- Load saved sessions to continue practicing
- Download sessions for backup
- Delete old sessions

## Technology Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS3 with CSS Variables
- **Storage:** Browser localStorage
- **Speech Synthesis:** Web Speech API

## Project Structure

```
English-Learning-Platform/
├── src/
│   ├── components/
│   │   ├── TextInput.jsx
│   │   ├── TextInput.css
│   │   ├── AudioPlayer.jsx
│   │   ├── AudioPlayer.css
│   │   ├── DictationPractice.jsx
│   │   ├── DictationPractice.css
│   │   ├── HistoryList.jsx
│   │   ├── HistoryList.css
│   │   ├── ThemeToggle.jsx
│   │   └── ThemeToggle.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Features Coming Soon

- 🎤 Microphone recording for pronunciation practice
- 📊 Progress tracking and statistics
- 🗂️ Lesson categories and organization
- 📚 Built-in word lists and vocabulary
- 🌐 Cloud sync option
- 🔊 Multiple voice options
- 📝 Advanced transcription features

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance

The application runs entirely in your browser with no backend server required. All data is stored locally on your device, ensuring privacy and offline access.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Happy Learning! 📚✨**
