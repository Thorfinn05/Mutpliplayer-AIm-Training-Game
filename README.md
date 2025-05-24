# Multiplayer Aim Trainer

A fast-paced, turn-based multiplayer aim training game designed to test and improve your reaction time and accuracy. Challenge your friends across various difficulty settings to see who has the quickest trigger finger\!

## Features

  * **Multiplayer Fun:** Play with 2 to 5 players.
  * **Turn-Based Gameplay:** Each player gets a dedicated turn to rack up their score.
  * **Dynamic Target Lifespan:** Targets disappear faster as the game progresses and based on difficulty, adding an increasing challenge.
  * **Multiple Difficulty Levels:**
      * **Easy:** A more relaxed pace to get started.
      * **Moderate:** Increased challenge with faster target disappearance.
      * **Hard:** For experienced players seeking a true test of their aim.
  * **Intuitive UI:** Clear screens for player setup, turn transitions, and game results.
  * **Score Tracking:** See individual scores and who emerges victorious\!

## How to Play

1.  **Start a New Game:** Upon launching, you'll be prompted to select a difficulty level (Easy, Moderate, Hard).
2.  **Player Setup:** Choose the number of players (2-5) and enter each player's name.
3.  **Take Your Turn:** Each player gets a 30-second turn to click on as many appearing targets as possible. The goal is to click a target before it disappears.
4.  **Dynamic Challenge:** As your turn progresses, and depending on the chosen difficulty, targets will disappear increasingly faster\!
5.  **Turn Transitions:** After each player's turn, a transition screen will show the score of the just-finished player and indicate whose turn is next.
6.  **Game Over:** Once all players have completed their turns, the "Game Over" screen will display all final scores and declare the winner(s).
7.  **Replay:** You can choose to play again with the same players and settings or start a completely new game.
<!--
## Target Disappearance Timings (per turn)

Targets will appear and disappear quickly. Their lifespan is determined by the elapsed time in the current player's turn and the chosen difficulty:

### Easy

  * **0-10 seconds elapsed:** Targets disappear after 3 seconds
  * **10-20 seconds elapsed:** Targets disappear after 2 seconds
  * **20-25 seconds elapsed:** Targets disappear after 1.5 seconds
  * **25-30 seconds elapsed:** Targets disappear after 1 second

### Moderate

  * **0-10 seconds elapsed:** Targets disappear after 2 seconds
  * **10-20 seconds elapsed:** Targets disappear after 1 second
  * **20-30 seconds elapsed:** Targets disappear after 0.5 seconds

### Hard

  * **0-10 seconds elapsed:** Targets disappear after 1.5 seconds
  * **10-20 seconds elapsed:** Targets disappear after 1 second
  * **20-25 seconds elapsed:** Targets disappear after 0.5 seconds
  * **25-30 seconds elapsed:** Targets disappear after 0.3 seconds
-->
## Technologies Used

  * React
  * TypeScript
  * HTML
  * CSS

## Getting Started (for developers)

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd multiplayer-aim-trainer
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This will open the application in your browser, usually at `http://localhost:3000`.

## Project Structure

```
.
├── public/                 // Static assets
│   └── index.html          // Main HTML file
├── src/
│   ├── components/         // React components
│   │   ├── DifficultySelection.tsx
│   │   ├── GameArea.tsx
│   │   ├── GameOverScreen.tsx
│   │   ├── GameSetup.tsx
│   │   ├── PlayerNameInput.tsx
│   │   ├── ScoreBoard.tsx
│   │   ├── Target.tsx
│   │   └── TurnTransitionScreen.tsx
│   ├── constants.ts        // Global constants (e.g., game timings)
│   ├── index.css           // Global styles
│   ├── index.tsx           // Entry point for React app
│   ├── App.tsx             // Main application component
│   └── types.ts            // TypeScript type definitions
└── package.json            // Project dependencies and scripts
```

## Contributing

Contributions are welcome\! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
