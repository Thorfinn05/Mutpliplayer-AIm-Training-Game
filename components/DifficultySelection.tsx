import React from 'react';
import { Difficulty } from '../types';

interface DifficultySelectionProps {
  onDifficultySelect: (difficulty: Difficulty) => void;
}

const difficulties: Difficulty[] = ['EASY', 'MODERATE', 'HARD'];

const DifficultySelection: React.FC<DifficultySelectionProps> = ({ onDifficultySelect }) => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold text-slate-200 mb-6">Select Difficulty</h2>
      <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
        {difficulties.map((level) => (
          <button
            key={level}
            onClick={() => onDifficultySelect(level)}
            className={`w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                       focus:ring-4 transform hover:scale-105 active:scale-95
                       ${level === 'EASY' ? 'bg-green-500 hover:bg-green-400 text-white focus:ring-green-300' : ''}
                       ${level === 'MODERATE' ? 'bg-yellow-500 hover:bg-yellow-400 text-white focus:ring-yellow-300' : ''}
                       ${level === 'HARD' ? 'bg-red-500 hover:bg-red-400 text-white focus:ring-red-300' : ''}
                      `}
          >
            {level.charAt(0) + level.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelection;