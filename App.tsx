
import React, { useState, useEffect, useCallback } from 'react';
import TargetComponent from './components/Target';
import ScoreBoard from './components/ScoreBoard';
import GameSetup from './components/GameSetup';
import PlayerNameInput from './components/PlayerNameInput';
import TurnTransitionScreen from './components/TurnTransitionScreen';
import GameOverScreen from './components/GameOverScreen';
import GameArea from './components/GameArea';
import DifficultySelection from './components/DifficultySelection'; // New component

import { TargetItem, Player, GamePhase, Difficulty } from './types';
import {
  GAME_DURATION_SECONDS,
  TARGET_SPAWN_INTERVAL_MS,
  MAX_TARGETS_ON_SCREEN,
  TARGET_COLORS,
  POINTS_PER_HIT,
  MIN_TARGET_SIZE,
  MAX_TARGET_SIZE,
} from './constants';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY'); // Default difficulty
  const [gamePhase, setGamePhase] = useState<GamePhase>('DIFFICULTY_SELECT');
  const [players, setPlayers] = useState<Player[]>([]);
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  
  const [currentTurnScore, setCurrentTurnScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_SECONDS);
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [isTurnActive, setIsTurnActive] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const getCurrentTargetLifespan = useCallback((currentTimeLeft: number, currentDifficulty: Difficulty): number => {
    const timeElapsed = GAME_DURATION_SECONDS - currentTimeLeft;

    switch (currentDifficulty) {
      case 'MODERATE':
        if (timeElapsed < 10) return 2000; // First 10 seconds
        if (timeElapsed < 20) return 1000; // Next 10 seconds
        return 500;                      // Last 10 seconds
      case 'HARD':
        if (timeElapsed < 10) return 1500; // First 10 seconds
        if (timeElapsed < 20) return 1000; // Next 10 seconds
        if (timeElapsed < 25) return 500;  // Next 5 seconds
        return 300;                      // Last 5 seconds
      case 'EASY':
      default: // Default to Easy
        if (timeElapsed < 10) return 3000;
        if (timeElapsed < 20) return 2000;
        if (timeElapsed < 25) return 1500;
        return 1000;
    }
  }, []);

  // Target Spawning Logic
  const spawnTarget = useCallback(() => {
    if (targets.length >= MAX_TARGETS_ON_SCREEN || !isTurnActive) return;

    const newTarget: TargetItem = {
      id: crypto.randomUUID(),
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      color: TARGET_COLORS[Math.floor(Math.random() * TARGET_COLORS.length)],
      size: Math.floor(Math.random() * (MAX_TARGET_SIZE - MIN_TARGET_SIZE + 1)) + MIN_TARGET_SIZE,
      createdAt: Date.now(),
    };
    setTargets((prevTargets) => [...prevTargets, newTarget]);
  }, [targets.length, isTurnActive]);

  // Spawn targets interval
  useEffect(() => {
    if (!isTurnActive) return;
    const spawnIntervalId = setInterval(spawnTarget, TARGET_SPAWN_INTERVAL_MS);
    return () => clearInterval(spawnIntervalId);
  }, [isTurnActive, spawnTarget]);

  // Target lifespan interval
  useEffect(() => {
    if (!isTurnActive && targets.length === 0) return;
    
    const currentLifespan = getCurrentTargetLifespan(timeLeft, difficulty);

    const clearExpiredInterval = setInterval(() => {
      setTargets(prevTargets =>
        prevTargets.filter(
          target => Date.now() - target.createdAt < currentLifespan
        )
      );
    }, 200); // Check frequently

    return () => clearInterval(clearExpiredInterval);
  }, [isTurnActive, targets, timeLeft, difficulty, getCurrentTargetLifespan]);

  // Game Timer Logic
  useEffect(() => {
    if (!isTurnActive || timeLeft === 0) {
      if (isTurnActive && timeLeft === 0) { // Turn ended
        setIsTurnActive(false);
        setTargets([]); 

        const updatedPlayers = [...players];
        if (updatedPlayers[currentPlayerIndex]) {
            updatedPlayers[currentPlayerIndex].score += currentTurnScore;
            setPlayers(updatedPlayers);
        }
        
        setGamePhase('ROUND_TRANSITION');
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTurnActive, timeLeft, players, currentPlayerIndex, currentTurnScore]);

  const handleTargetClick = useCallback((targetId: string) => {
    if (!isTurnActive) return;
    setTargets((prevTargets) => prevTargets.filter((t) => t.id !== targetId));
    setCurrentTurnScore((prevScore) => prevScore + POINTS_PER_HIT);
  }, [isTurnActive]);

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGamePhase('SETUP');
  };

  const handleSetupComplete = (count: number) => {
    setNumPlayers(count);
    setGamePhase('NAME_INPUT');
  };

  const handleNamesSubmit = (names: string[]) => {
    const newPlayers: Player[] = names.map(name => ({ id: crypto.randomUUID(), name, score: 0 }));
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setHasGameStarted(false); 
    setGamePhase('ROUND_TRANSITION');
  };

  const startPlayerTurn = (playerIndexToStart: number) => {
    if (!players[playerIndexToStart]) {
        console.error("Attempting to start turn for invalid player index:", playerIndexToStart);
        setGamePhase('GAME_OVER');
        return;
    }
    setCurrentPlayerIndex(playerIndexToStart);
    setCurrentTurnScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setTargets([]);
    setIsTurnActive(true);
    setHasGameStarted(true);
    setGamePhase('PLAYING');
    spawnTarget(); 
  };
  
  const handleNextTurn = () => { 
    const nextPotentialPlayerIndex = currentPlayerIndex + 1;
    if (nextPotentialPlayerIndex < numPlayers) {
      startPlayerTurn(nextPotentialPlayerIndex);
    } else {
      setGamePhase('GAME_OVER');
    }
  };

  const handlePlayAgain = () => {
    // Difficulty remains the same
    setPlayers(prevPlayers => prevPlayers.map(p => ({ ...p, score: 0 })));
    setCurrentPlayerIndex(0);
    setHasGameStarted(false);
    setGamePhase('ROUND_TRANSITION');
  };

  const handleNewGame = () => {
    setGamePhase('DIFFICULTY_SELECT'); // Start from difficulty selection
    setPlayers([]);
    setNumPlayers(0);
    setCurrentPlayerIndex(0);
    setCurrentTurnScore(0);
    setTimeLeft(GAME_DURATION_SECONDS);
    setTargets([]);
    setIsTurnActive(false);
    setHasGameStarted(false);
    // setDifficulty('EASY'); // Optionally reset difficulty or let it persist until changed
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-4 noselect">
      <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-2xl relative">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-cyan-400 mb-6">
          Multiplayer Aim Trainer
        </h1>
        
        {gamePhase !== 'DIFFICULTY_SELECT' && gamePhase !== 'SETUP' && gamePhase !== 'NAME_INPUT' && gamePhase !== 'GAME_OVER' && gamePhase !== 'ROUND_TRANSITION' && players[currentPlayerIndex] && (
          <ScoreBoard 
            currentPlayerName={players[currentPlayerIndex].name}
            currentTurnScore={currentTurnScore}
            timeLeft={timeLeft} 
            isTurnActive={isTurnActive}
          />
        )}

        {gamePhase === 'DIFFICULTY_SELECT' && <DifficultySelection onDifficultySelect={handleDifficultySelect} />}
        
        {gamePhase === 'SETUP' && <GameSetup onSetupComplete={handleSetupComplete} />}
        
        {gamePhase === 'NAME_INPUT' && <PlayerNameInput numPlayers={numPlayers} onNamesSubmit={handleNamesSubmit} />}
        
        {gamePhase === 'ROUND_TRANSITION' && (() => {
            const playerAboutToPlayIndex = !hasGameStarted ? 0 : currentPlayerIndex + 1;
            const playerWhoJustFinishedIndex = hasGameStarted ? currentPlayerIndex : -1;

            const nextPlayerForScreen = players[playerAboutToPlayIndex];
            const finishedPlayerForScreen = playerWhoJustFinishedIndex !== -1 ? players[playerWhoJustFinishedIndex] : undefined;

            return (
              <TurnTransitionScreen
                playerName={nextPlayerForScreen ? nextPlayerForScreen.name : "Results"}
                previousPlayerName={finishedPlayerForScreen?.name}
                previousPlayerScore={finishedPlayerForScreen?.score}
                isAboutToStartFirstTurnInGame={!hasGameStarted && playerAboutToPlayIndex === 0}
                onProceed={() => {
                  if (!hasGameStarted) { 
                    startPlayerTurn(0);
                  } else if (playerAboutToPlayIndex < numPlayers) { 
                    startPlayerTurn(playerAboutToPlayIndex); 
                  } else { 
                    setGamePhase('GAME_OVER');
                  }
                }}
                isLastTurnTransition={playerAboutToPlayIndex >= numPlayers}
              />
            );
        })()}

        {gamePhase === 'PLAYING' && (
          <GameArea
            targets={targets}
            onTargetClick={handleTargetClick}
            isTurnActive={isTurnActive}
          />
        )}
        
        {gamePhase === 'GAME_OVER' && (
          <GameOverScreen 
            players={players} 
            onPlayAgain={handlePlayAgain} 
            onNewGame={handleNewGame} 
          />
        )}
        
        {(gamePhase === 'PLAYING' || (gamePhase === 'ROUND_TRANSITION' && !isTurnActive) || gamePhase === 'GAME_OVER') && (
             <p className="text-center text-sm text-slate-400 mt-6">
                {gamePhase === 'PLAYING' && players[currentPlayerIndex] && `Click the colored circles, ${players[currentPlayerIndex].name}! Difficulty: ${difficulty}`}
                {gamePhase === 'ROUND_TRANSITION' && !isTurnActive && (() => {
                    const playerAboutToPlayIndex = !hasGameStarted ? 0 : currentPlayerIndex + 1;
                    if (playerAboutToPlayIndex < numPlayers && players[playerAboutToPlayIndex]) {
                        return `Get ready, ${players[playerAboutToPlayIndex].name}! Difficulty: ${difficulty}`;
                    }
                    if(playerAboutToPlayIndex >=numPlayers) return "Calculating final results...";
                    return ""; 
                })()}
                {gamePhase === 'GAME_OVER' && `Thanks for playing! Difficulty: ${difficulty}`}
            </p>
        )}
      </div>
       <footer className="text-center text-slate-500 mt-8 text-sm">
        Enhanced Multiplayer Aim Trainer. Built by Thorfinn05.
      </footer>
    </div>
  );
};

export default App;
