# 🧠 Open Trivia Quiz — Project 1

> An interactive, customisable online quiz powered by the **Open Trivia Database API**. Users select their preferred category, difficulty, question type, and number of questions — then get fresh questions live from the API every time.

---

## 🎯 Purpose
This project demonstrates a full front-end web application built with **HTML5, CSS3, and vanilla JavaScript**, featuring real API integration, dynamic content loading, user input handling, and responsive design.

### Value to Users
- ✅ **Customisable quiz** — choose exactly what you want to be tested on
- ✅ **Fresh questions every time** — pulls live from a database of thousands
- ✅ **No sign-up or API key required** — instant, free use
- ✅ **Educational feedback** — see what you got right/wrong with context
- ✅ **Fully responsive** — works seamlessly on phones, tablets, and desktops
- ✅ **Accessible design** — high-contrast colours, clear typography, logical navigation

---

## 🛠️ Technologies Used

| Technology | Purpose | Validation Status |
|---|---|---|
| **HTML5** | Semantic page structure, forms, navigation | ✅ Passed W3C Validator |
| **CSS3** | Responsive layout, styling, accessibility | ✅ Passed Jigsaw Validator |
| **Vanilla JavaScript (ES6+)** | API fetching, state management, scoring, interactivity | ✅ Passed JSHint — no issues |
| **Open Trivia Database API** | Dynamic question source — no key required | ✅ Live & free service |

---

## 📁 File Structure
online-quiz/
├── index.html # Main app: selection form + quiz screens
├── how-to.html # Instructions & evaluation guide
├── css/
│ └── styles.css # All styling — single file, well organised
├── js/
│ └── script.js # Full app logic + API integration
├── assets/
│ └── images/ # Store graphics/icons here
│ └── .gitkeep
├── screenshots/ # Documentation images
│ └── .gitkeep
├── .gitignore # Excludes system/editor files from repo
└── README.md # This file
plaintext

---

## 🚀 Quick Start

### Run Locally
1. **Download or clone** this repository
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge)
3. That’s it — **no server, no build tools, no installation required**

### How to Use
1. **Customise your quiz** using the dropdowns:
   - Number of questions (5–20)
   - Category (Any, General Knowledge, Science, History, and more)
   - Difficulty (Any / Easy / Medium / Hard)
   - Question Type (Any / Multiple Choice / True–False)
2. Click **Start Quiz** — questions load live from the API
3. **Select an answer** → click **Next**
4. On the final question → click **Submit Quiz**
5. Review your **score percentage** + full breakdown of every question
6. Click **Take Quiz Again** to return to the selection form and try new preferences

---

## 🔌 API Integration Details

### About Open Trivia Database
- **Provider:** [opentdb.com](https://opentdb.com/)
- **Documentation:** [opentdb.com/api_config.php](https://opentdb.com/api_config.php)
- **API Key Required?** ❌ **No — completely free public API**
- **License:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Rate Limit:** 1 request every 5 seconds
- **Max per request:** 50 questions

### How It Works
1. User submits the selection form → app builds a URL like:
https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
plaintext
2. `fetch()` sends the request asynchronously
3. Response is validated — friendly error messages appear if:
- No questions match your selection
- Too many requests too quickly
- Invalid parameters sent
4. HTML entities (special characters) are decoded for readability
5. Correct answer is shuffled among options so position changes every time

### Response Codes Handled
| Code | Meaning | User Message |
|---|---|---|
| 0 | ✅ Success | Quiz starts |
| 1 | No results found | "Try fewer questions or change category" |
| 2 | Invalid parameter | "Please check your selection" |
| 5 | Rate limited | "Wait 5 seconds and try again" |

---

## ✅ Validation & Testing

### Code Quality
| Tool | Result | Link |
|---|---|---|
| W3C HTML Validator | ✅ Pass — 0 errors | [validator.w3.org](https://validator.w3.org/) |
| Jigsaw CSS Validator | ✅ Pass — 0 errors | [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/) |
| JSHint JavaScript | ✅ Pass — no significant issues | [jshint.com](https://www.jshint.com/) |

### Functionality Verified
- [x] Form submits and triggers API fetch
- [x] Loading message appears during API call
- [x] Answers are shuffled — correct position changes every time
- [x] Cannot proceed without selecting an answer
- [x] Score calculation matches correct answers
- [x] Review shows your answer + correct answer + category context
- [x] Restart returns to selection form
- [x] All internal links work correctly
- [x] Cross-browser tested: Chrome, Firefox, Safari ✅
- [x] Responsive tested: 320px (mobile) → 1200px+ (desktop) ✅
- [x] API error states handled gracefully

---
