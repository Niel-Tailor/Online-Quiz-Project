# Open Trivia Quiz

A simple online quiz built with HTML, CSS and JavaScript. You choose the topic, difficulty and number of questions, and the app loads fresh questions from the [Open Trivia Database](https://opentdb.com/).

## Why I Built This

I wanted to build a real website that uses an API, handles user input and works on any screen size. It's also fun to play!

## Features

- Pick the number of questions (5 to 20)
- Choose a category, difficulty and question type
- New questions every time you play
- See your score and review every answer at the end
- Works on phones, tablets and computers
- No sign-up or API key needed

## Built With

- **HTML** for the page structure
- **CSS** for the styling and responsive layout
- **JavaScript** for fetching questions, scoring and the quiz logic
- **Open Trivia Database API** for the questions

## How to Use

1. Open `index.html` in your browser
2. Choose your quiz options
3. Click **Start Quiz**
4. Pick an answer and click **Next**
5. On the last question, click **Submit Quiz**
6. See your score and review your answers
7. Click **Take Quiz Again** to play another round

## Project Files

```
online-quiz/
├── index.html      # Main page (options form and quiz)
├── how-to.html     # Instructions page
├── css/
│   └── styles.css  # All the styling
├── js/
│   └── script.js   # Quiz logic and API code
├── assets/
│   └── images/     # Images and icons
├── screenshots/    # Screenshots for this README
├── .gitignore
└── README.md
```

## How the API Works

When you click **Start Quiz**, the app builds a web address from your choices, for example:

```
https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
```

It then fetches the questions from that address. If something goes wrong (for example, no questions match your choices), the app shows a friendly error message instead of breaking.

The API is free, but it only allows one request every 5 seconds, so if you click too fast you may need to wait a moment.

## Testing

I checked my code with these tools:

| Tool | What it checks | Result |
|---|---|---|
| [W3C HTML Validator](https://validator.w3.org/) | HTML | Passed |
| [Jigsaw CSS Validator](https://jigsaw.w3.org/css-validator/) | CSS | Passed |
| [JSHint](https://jshint.com/) | JavaScript | Passed |

I also tested by hand that:

- The quiz loads questions from the API
- You can't move on without choosing an answer
- The score is calculated correctly
- The review shows your answer and the correct answer
- The quiz restarts properly
- It works in Chrome, Firefox and Safari
- It looks good on small and large screens

## Credits

- Questions from the [Open Trivia Database](https://opentdb.com/), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)