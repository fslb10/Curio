# Curio

An interactive lesson hub for children aged 8 to 10. Kids pick a lesson, work through illustrated content cards, answer knowledge checks along the way, take a short quiz, and earn stars on a celebration screen. Progress is saved automatically so they can stop and resume any time.

---

## How to open it

Double-click `index.html` in any browser. No installation, no internet connection, no server required. Everything is embedded in the single file.

---

## How to add a new lesson

All lesson content lives in the `LESSONS` array near the top of `index.html`, clearly marked with the comment:

```
// ============ ADD NEW LESSONS HERE ============
```

Add a new object to the array using the shape below.

### Full data shape

```javascript
{
  id: "your-lesson-id",          // unique, lowercase, hyphenated
  title: "Lesson Title",
  description: "One or two sentences shown on the hub card.",
  color: "#F59E0B",              // hex accent color for this lesson
  emoji: "🌍",                   // shown on the hub card
  cards: [
    {
      title: "Card heading",
      body: "Body text shown to the child. Aim for 3 to 5 short sentences.",
      image: ""                  // leave empty for now; slot is reserved
    }
    // add 5 to 7 cards total
  ],
  checks: [
    // knowledge checks shown between cards
    // afterCard: 1 means this check appears after card index 1 (the second card)
    {
      type: "mcq",
      afterCard: 1,
      question: "Question text here?",
      options: [
        { id: "a", text: "correct answer", correct: true },
        { id: "b", text: "wrong answer",   correct: false },
        { id: "c", text: "wrong answer",   correct: false },
        { id: "d", text: "wrong answer",   correct: false }
      ],
      explanation: "Shown after two wrong attempts. Keep it kind and clear."
    },
    {
      type: "tf",
      afterCard: 3,
      question: "A true or false statement.",
      correct: true,
      explanation: "Shown after two wrong attempts."
    },
    {
      type: "match",
      afterCard: 5,
      question: "Match each one to its description.",
      pairs: [
        { left: "Term A", right: "What term A means" },
        { left: "Term B", right: "What term B means" },
        { left: "Term C", right: "What term C means" },
        { left: "Term D", right: "What term D means" }
      ],
      explanation: "Shown after two wrong attempts."
    }
  ],
  quiz: [
    // 4 to 5 questions. Same shapes as checks but no afterCard field.
    {
      type: "mcq",
      question: "Quiz question?",
      options: [
        { id: "a", text: "correct answer", correct: true },
        { id: "b", text: "wrong answer",   correct: false },
        { id: "c", text: "wrong answer",   correct: false },
        { id: "d", text: "wrong answer",   correct: false }
      ],
      explanation: "Explanation shown after two wrong attempts."
    }
    // add tf and match questions following the same shapes above
  ]
}
```

### Worked example: a weather lesson

```javascript
{
  id: "weather-01",
  title: "How Weather Works",
  description: "Find out why it rains, how clouds form, and what makes wind blow.",
  color: "#60A5FA",
  emoji: "🌦️",
  cards: [
    {
      title: "What is weather?",
      body: "Weather is what is happening in the air outside right now. Is it sunny, rainy, windy, or snowy? Weather changes every day because the sun heats the air and water on Earth in different ways.",
      image: ""
    },
    {
      title: "How clouds form",
      body: "When the sun heats water in rivers, lakes, and oceans, tiny drops turn into invisible gas called water vapor. The vapor floats up into the sky, cools down, and turns back into tiny water droplets. Millions of those droplets cluster together to make a cloud.",
      image: ""
    },
    {
      title: "Why it rains",
      body: "Water droplets inside a cloud bump into each other and stick together. When they get heavy enough, they fall as rain. In very cold air, the drops freeze and fall as snow or hail instead.",
      image: ""
    }
  ],
  checks: [
    {
      type: "tf",
      afterCard: 1,
      question: "Clouds are made of tiny water droplets.",
      correct: true,
      explanation: "Correct. Clouds form when water vapor cools and turns into tiny droplets that cluster together."
    }
  ],
  quiz: [
    {
      type: "mcq",
      question: "What causes water to turn into vapor and rise into the sky?",
      options: [
        { id: "a", text: "The moon pulls it upward",    correct: false },
        { id: "b", text: "The sun heats it",            correct: true },
        { id: "c", text: "Wind blows it up",            correct: false },
        { id: "d", text: "Clouds suck it in",           correct: false }
      ],
      explanation: "The sun heats water on the surface, turning it into vapor that rises into the sky."
    },
    {
      type: "tf",
      question: "Snow and hail are both forms of frozen rain.",
      correct: true,
      explanation: "Yes. When water droplets freeze before or while falling, they become snow or hail."
    }
  ]
}
```

---

## Storage and the future Supabase migration

All reads and writes of progress data go through a single `Storage` object in `index.html`. Right now it wraps `localStorage`, so everything stays in the browser. When the time comes to add user accounts and sync progress across devices, only `Storage` needs to change: swap the three methods (`load`, `save`, `clear`) to call a Supabase client instead, pointing at a `progress` table with `user_id`, `key`, and `value` columns. The progress shape stored under `curio.progress` maps directly onto that table with no restructuring. Every other part of the app calls `Storage.load`, `Storage.save`, or `Storage.clear` and will work without any further edits.

---

## Star scoring

| Score         | Stars |
|---------------|-------|
| 90% or higher | 3     |
| 70% or higher | 2     |
| Any finish    | 1     |

Confetti plays on 2 or 3 stars. The hub card shows the best star count earned across all attempts.
