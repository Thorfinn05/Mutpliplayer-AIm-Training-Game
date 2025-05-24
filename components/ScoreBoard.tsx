import React from 'react';

interface ScoreBoardProps {
  currentPlayerName?: string;
  currentTurnScore: number;
  timeLeft: number;
  isTurnActive: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ currentPlayerName, currentTurnScore, timeLeft, isTurnActive }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center bg-slate-700/50 p-4 rounded-lg shadow-md mb-6 space-y-3 sm:space-y-0">
      {currentPlayerName && (
         <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider text-center sm:text-left">Current Player</p>
          <p className="text-2xl font-bold text-cyan-400 text-center sm:text-left">{currentPlayerName}</p>
        </div>
      )}
      <div>
        <p className="text-sm text-slate-400 uppercase tracking-wider">Turn Score</p>
        <p className="text-3xl font-bold text-green-400">{currentTurnScore}</p>
      </div>
      <div>
        <p className="text-sm text-slate-400 uppercase tracking-wider">Time Left</p>
        <p className={`text-3xl font-bold ${timeLeft <= 10 && isTurnActive ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
          {timeLeft}s
        </p>
      </div>
    </div>
  );
};

export default ScoreBoard;
