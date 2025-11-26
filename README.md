# 🛡️ Ultimate Phishing Analyzer

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#-usage)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Project Structure](#-project-structure)
- [Features in Detail](#-features-in-detail)
- [Contributing](#-contributing)
- [License](#-license)
- 🎮 **Gamified Learning**: Interactive quizzes and achievement system to learn security best practices
- 🌐 **Multilingual Support**: Analyze emails in multiple languages
- 📊 **Comprehensive Reports**: Detailed analysis with threat breakdowns and security recommendations
- ♿ **Accessible**: Full keyboard navigation and screen reader support
- 🎨 **Modern UI**: Beautiful, responsive design with dark/light mode

---

## ✨ Features

### 🔍 Core Detection Capabilities

- **Advanced Keyword Detection**: Identifies urgent, prize, threat, and action keywords
- **URL Analysis**: Detects IP-based URLs, shortened links, and suspicious domains
- **Brand Impersonation Detection**: Recognizes fake emails from popular brands (Amazon, Microsoft, PayPal, etc.)
- **Sensitive Information Requests**: Flags requests for passwords, credit cards, SSN, etc.
- **Email Header Parsing**: Validates SPF, DKIM, and DMARC authentication
- **Attachment Analysis**: Detects suspicious download mentions
- **Real-time Scoring**: Live threat scoring (0-100) with 500ms debounce

### 🎨 User Experience

- **Interactive Analysis**: URL highlighter, copy reports, share results, export to PDF
- **Example Email Library**: 7 pre-loaded examples (safe, suspicious, phishing)
- **Analysis History**: Saves last 20 analyses locally
- **Dark/Light Mode**: Smooth theme transitions
- **Micro-interactions**: Confetti for safe emails, shake animation for threats
- **Progress Stepper**: Visual 4-phase analysis indicator
- **Toast Notifications**: Real-time feedback for all actions

### 🎮 Gamification & Learning

- **Quiz Mode**: 5-question security quizzes with instant feedback
- **Achievement System**: 6 unlockable achievements
  - 🏆 First Scan (1 analysis)
  - 🎯 Phishing Hunter (5 phishing detected)
  - 🔒 Security Expert (50 analyses)
  - ⭐ Perfect Detection (100 score email)
  - 🛡️ Safe Keeper (10 safe emails)
  - 🔥 Streak Master (7 days)
- **Statistics Dashboard**: Track your progress with detailed metrics
- **Security Tips Carousel**: 10 rotating security tips with auto-rotation

### ♿ Accessibility Features

- **ARIA Labels**: Complete screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast Mode**: Support for visual impairments
- **Reduced Motion**: Respects user motion preferences
- **Color-blind Friendly**: Accessible color schemes

### 📊 Analysis & Reporting

- **Threat Score**: 0-100 scoring with color coding
- **Confidence Percentage**: 85-99% confidence levels
- **Detection Metrics**: Keyword matches, URL issues, sensitive requests
- **Pie Chart Visualization**: Threat breakdown
- **Security Recommendations**: Context-specific advice based on threat level
- **Export Options**: Copy to clipboard, share via URL, PDF export

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **bun** (v1.0.0 or higher)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shii9/Phishing-Analyzer.git
cd Phishing-Analyzer
```

2. **Navigate to the project directory**

```bash
cd Phishing-Analyzer
```

3. **Install dependencies**

Using npm:
```bash
npm install
```

Or using bun (faster):
```bash
bun install
```

4. **Configure environment variables** (Optional)

Copy the `.env.example` file to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your actual values:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your-project-id.supabase.co
```

> **Note**: The application works without Supabase. It uses localStorage for data persistence by default. Supabase is only needed for advanced features like cloud sync.

### Running the Application

#### Development Mode

```bash
npm run dev
```

Or with bun:
```bash
bun run dev
```

The application will start at `http://localhost:5173`

#### Production Build

```bash
npm run build
npm run preview
```

Or with bun:
```bash
bun run build
bun run preview
```

#### Linting

```bash
npm run lint
```

---

## 📖 Usage

### Basic Analysis

1. **Open the application** in your browser
2. **Paste or type** an email into the text area
3. **Click "Analyze Email"** or press `Ctrl+Enter`
4. **Review the results**: threat score, detected issues, and recommendations

### Using Example Emails

1. Click on **"Example Emails"** in the sidebar
2. Choose from **Safe**, **Suspicious**, or **Phishing** categories
3. Click any example to load it into the analyzer

### Viewing Analysis History

1. Press **`H`** or click the history icon
2. Browse your last 20 analyses
3. Click any history item to reload it

### Taking Security Quizzes

1. Press **`Q`** or click the quiz icon
2. Answer 5 multiple-choice questions
3. Get instant feedback and learn from explanations
4. Track your quiz scores in the stats dashboard

### Checking Your Statistics

1. Press **`S`** or navigate to `/stats`
2. View your total analyses, detection accuracy, and achievements
3. Track your progress toward unlocking new achievements

### Exporting Results

- **Copy to Clipboard**: Click the copy icon
- **Share via URL**: Click the share icon to generate a shareable link
- **Export to PDF**: Click the PDF icon to download a detailed report

---

## 📁 Project Structure

```
Phishing-Analyzer/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   └── sw.js
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React contexts (Analytics, etc.)
│   ├── data/            # Static data (example emails, quiz questions)
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations (Supabase)
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components (Index, Stats, Trends, Assessment)
│   ├── providers/       # Context providers
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions (detection engine)
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (not committed)
├── .gitignore
├── components.json      # Shadcn/ui configuration
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

---

## 🔍 Features in Detail

### Detection Engine

The phishing detection engine uses multiple heuristics to analyze emails:

1. **Keyword Analysis**: Scans for urgent language, threats, prizes, and action words
2. **URL Inspection**: Checks for IP addresses, shortened URLs, and suspicious TLDs
3. **Brand Detection**: Identifies impersonation attempts of 20+ popular brands
4. **Sensitive Data Requests**: Flags requests for passwords, credit cards, SSN, etc.
5. **Generic Greetings**: Detects non-personalized greetings
6. **Link Density**: Analyzes the number and distribution of links

### Scoring System

- **0-29**: ✅ Safe - Low threat level
- **30-69**: ⚠️ Suspicious - Medium threat level
- **70-100**: 🚨 Phishing - High threat level

### Data Persistence

All data is stored locally using `localStorage`:
- Analysis history (last 20 analyses)
- User statistics and progress
- Achievement unlocks
- Theme preferences
- Quiz scores

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---


## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Shadcn/ui** for beautiful component designs
- **Tailwind CSS** for utility-first styling
- **Lucide** for the icon library
- **Vercel** for hosting and deployment
- All contributors and users who help improve this tool

---

## 📞 Support

If you encounter any issues or have questions:

- 🐛 [Report a bug](https://github.com/shii9/Phishing-Analyzer/issues)
- 💡 [Request a feature](https://github.com/shii9/Phishing-Analyzer/issues)
- 📧 Contact: sourovlimon85@gmail.com

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**Made with ❤️ for a safer internet**

[⬆ Back to Top](#-ultimate-phishing-analyzer)

</div>
