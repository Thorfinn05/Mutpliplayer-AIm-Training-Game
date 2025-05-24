import React, { useState } from 'react';
import { MIN_PLAYERS, MAX_PLAYERS } from '../constants';

interface GameSetupProps {
  onSetupComplete: (numPlayers: number) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onSetupComplete }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number>(MIN_PLAYERS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetupComplete(selectedPlayers);
  };

  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold text-slate-200 mb-6">Select Number of Players</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, i) => i + MIN_PLAYERS).map(num => (
            <button
              key={num}
              type="button"
              onClick={() => setSelectedPlayers(num)}
              className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                          ${selectedPlayers === num 
                            ? 'bg-cyan-500 text-white ring-2 ring-cyan-300' 
                            : 'bg-slate-600 hover:bg-slate-500 text-slate-300'
                          }`}
            >
              {num}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                     bg-green-500 hover:bg-green-400 text-white focus:ring-4 focus:ring-green-300 transform hover:scale-105 active:scale-95"
        >
          Confirm Players
        </button>
      </form>
    </div>
  );
};

export default GameSetup;
