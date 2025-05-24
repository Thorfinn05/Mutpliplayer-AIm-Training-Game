import React, { useState, useEffect } from 'react';

interface PlayerNameInputProps {
  numPlayers: number;
  onNamesSubmit: (names: string[]) => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ numPlayers, onNamesSubmit }) => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    setNames(Array(numPlayers).fill('').map((_, i) => `Player ${i + 1}`));
  }, [numPlayers]);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (names.every(name => name.trim() !== '')) {
      onNamesSubmit(names.map(name => name.trim()));
    } else {
      alert("Please ensure all players have entered a name.");
    }
  };

  if (numPlayers === 0) return null;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold text-slate-200 mb-6 text-center">Enter Player Names</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        {Array.from({ length: numPlayers }).map((_, index) => (
          <div key={index}>
            <label htmlFor={`player-${index}`} className="block text-sm font-medium text-slate-300 mb-1">
              Player {index + 1}
            </label>
            <input
              type="text"
              id={`player-${index}`}
              value={names[index] || ''}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-slate-100 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder={`Enter name for Player ${index + 1}`}
              required
              maxLength={20}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full mt-6 px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                     bg-green-500 hover:bg-green-400 text-white focus:ring-4 focus:ring-green-300 transform hover:scale-105 active:scale-95"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerNameInput;
