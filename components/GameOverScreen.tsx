import React from 'react';
import { Player } from '../types';

interface GameOverScreenProps {
  players: Player[];
  onPlayAgain: () => void;
  onNewGame: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ players, onPlayAgain, onNewGame }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const highScore = sortedPlayers.length > 0 ? sortedPlayers[0].score : 0;
  const winners = sortedPlayers.filter(player => player.score === highScore);

  return (
    <div className="text-center py-8">
      <h2 className="text-4xl font-bold text-red-500 mb-6">Game Over!</h2>
      
      {winners.length > 0 && (
        <div className="mb-6">
          <p className="text-2xl text-yellow-400 font-semibold">
            {winners.length > 1 ? 'Winners:' : 'Winner:'}
          </p>
          {winners.map(winner => (
            <p key={winner.id} className="text-3xl text-cyan-400">{winner.name} <span className="text-yellow-400">({winner.score} points)</span></p>
          ))}
        </div>
      )}

      <h3 className="text-xl font-semibold text-slate-300 mb-4">Final Scores:</h3>
      <ul className="space-y-2 max-w-xs mx-auto mb-8">
        {sortedPlayers.map((player) => (
          <li 
            key={player.id} 
            className={`flex justify-between p-3 rounded-md text-lg
                        ${winners.some(w => w.id === player.id) ? 'bg-yellow-500/30 text-yellow-300' : 'bg-slate-700 text-slate-200'}`}
          >
            <span>{player.name}:</span>
            <span className="font-bold">{player.score}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                     bg-cyan-500 hover:bg-cyan-400 text-white focus:ring-4 focus:ring-cyan-300 transform hover:scale-105 active:scale-95"
        >
          Play Again (Same Players)
        </button>
        <button
          onClick={onNewGame}
          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                     bg-green-500 hover:bg-green-400 text-white focus:ring-4 focus:ring-green-300 transform hover:scale-105 active:scale-95"
        >
          New Game Setup
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
