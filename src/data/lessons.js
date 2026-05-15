// Lessons content. Add new lessons by appending to this array.
// Each lesson has cards (content), checks (mid-lesson questions), and
// a quiz (final assessment). Question types supported:
//   mcq, tf, match, fillblank, sequence.

export const LESSONS = [
  {
    id: "computers-01",
    title: "How Computers Work",
    description: "Find out what makes computers tick, from the brain inside to the buttons you tap.",
    color: "#4F8FD9",
    emoji: "💻",
    cards: [
      {
        title: "What is a computer?",
        emoji: "🤖",
        body: "A computer is a machine that follows instructions. It can do math super fast, store huge amounts of information, and show you words, pictures, videos, and games. Phones, tablets, laptops, smart TVs, even some fridges are computers."
      },
      {
        title: "Hardware and software",
        emoji: "⚙️",
        body: "Hardware is the parts you can touch. The screen, the keyboard, the chips inside. Software is the instructions. The apps, games, and programs. Hardware without software is like a body with no ideas. Software without hardware has nowhere to live."
      },
      {
        title: "Input and output",
        emoji: "🔁",
        body: "Input is anything you give the computer. Typing, tapping, talking, clicking. Output is what the computer gives back. Pictures on the screen, sound from speakers, words printed on paper. Computers are always doing this loop. Take input, think, send output."
      },
      {
        title: "The CPU is the brain",
        emoji: "🧠",
        body: "Inside every computer is a tiny chip called the CPU, the Central Processing Unit. It does billions of small math problems every second. That is how a computer can run a game, play music, and check the time all at once. It is the brain of the machine."
      },
      {
        title: "Memory and storage",
        emoji: "🗄️",
        body: "Memory, also called RAM, is short-term. It holds what the computer is using right now. When you close an app, RAM forgets it. Storage is long-term. It holds your photos, videos, and files even after the computer turns off. Think of memory like your desk and storage like your closet."
      },
      {
        title: "Putting it all together",
        emoji: "🎮",
        body: "When you tap a game icon, here is what happens. Your tap is input. The CPU reads instructions from storage and loads them into memory. The CPU runs the game and sends pictures to the screen and sounds to the speakers. That is output. All of this happens in less than one second. Computers are amazing."
      }
    ],
    checks: [
      {
        type: "mcq",
        afterCard: 1,
        question: "Which of these is hardware?",
        options: [
          { id: "a", text: "a screen", correct: true },
          { id: "b", text: "a game app", correct: false },
          { id: "c", text: "a song you downloaded", correct: false },
          { id: "d", text: "a website", correct: false }
        ],
        explanation: "Hardware is the parts you can touch. A screen is physical. Apps, songs, and websites are software or data."
      },
      {
        type: "fillblank",
        afterCard: 3,
        question: "The ___ is the part of the computer that thinks and does all the math.",
        blank: "CPU",
        hint: "Three letters. It stands for Central Processing Unit.",
        explanation: "The CPU is the brain of the computer. It runs all the instructions."
      },
      {
        type: "tf",
        afterCard: 3,
        question: "The CPU is the brain of the computer.",
        correct: true,
        explanation: "Right. The CPU does the thinking and the math for everything the computer does."
      },
      {
        type: "match",
        afterCard: 4,
        question: "Match each one to its job.",
        pairs: [
          { left: "Memory (RAM)", right: "Holds what you are using right now" },
          { left: "Storage",      right: "Keeps files even when off" },
          { left: "CPU",          right: "Does the math and thinking" },
          { left: "Screen",       right: "Shows you output" }
        ],
        explanation: "Memory is short-term. Storage is long-term. The CPU thinks. The screen shows output."
      },
      {
        type: "sequence",
        afterCard: 5,
        question: "Put these steps in the right order for what happens when you tap a game icon.",
        items: [
          "CPU loads instructions into memory",
          "Your tap is sent as input",
          "Game appears on screen as output",
          "CPU runs the game"
        ],
        correct: [1, 0, 3, 2],
        explanation: "First your tap goes in, then CPU loads the game, runs it, then shows it on screen."
      }
    ],
    quiz: [
      {
        type: "mcq",
        question: "What does the CPU do?",
        options: [
          { id: "a", text: "It stores all your photos", correct: false },
          { id: "b", text: "It does the math and runs the instructions", correct: true },
          { id: "c", text: "It connects to the internet", correct: false },
          { id: "d", text: "It charges the battery", correct: false }
        ],
        explanation: "The CPU is the brain. It runs instructions and does the math billions of times a second."
      },
      {
        type: "tf",
        question: "Software is the parts of a computer you can touch.",
        correct: false,
        explanation: "That is hardware. Software is the instructions. Apps and games are software."
      },
      {
        type: "fillblank",
        question: "Short-term memory in a computer is also called ___.",
        blank: "RAM",
        hint: "Three letters. It stands for Random Access Memory.",
        explanation: "RAM is short-term memory. It holds what is being used right now."
      },
      {
        type: "mcq",
        question: "Which of these is an example of output?",
        options: [
          { id: "a", text: "Tapping the screen", correct: false },
          { id: "b", text: "Talking to a voice assistant", correct: false },
          { id: "c", text: "A picture showing on the screen", correct: true },
          { id: "d", text: "Plugging in a charger", correct: false }
        ],
        explanation: "Output is what the computer sends back to you. A picture on the screen is output."
      },
      {
        type: "match",
        question: "Match each one to the right example.",
        pairs: [
          { left: "Input",   right: "Tapping the keyboard" },
          { left: "Output",  right: "Sound from a speaker" },
          { left: "Memory",  right: "Holding what is open right now" },
          { left: "Storage", right: "Keeping files forever" }
        ],
        explanation: "Input goes in, output comes out. Memory is short-term, storage is long-term."
      },
      {
        type: "sequence",
        question: "Order the steps of the input output loop, starting with what you do first.",
        items: [
          "The computer thinks with the CPU",
          "You give input by tapping",
          "The computer sends output to the screen"
        ],
        correct: [1, 0, 2],
        explanation: "You give input first. Then the CPU thinks. Then it sends back output."
      },
      {
        type: "mcq",
        question: "Why does memory (RAM) forget things when you close an app?",
        options: [
          { id: "a", text: "The computer is broken", correct: false },
          { id: "b", text: "RAM is for short-term use only", correct: true },
          { id: "c", text: "The CPU erased it on purpose", correct: false },
          { id: "d", text: "RAM only works when plugged in", correct: false }
        ],
        explanation: "RAM is short-term. It only holds what is being used right now. Storage is what keeps things long-term."
      }
    ]
  }
];
