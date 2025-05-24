import React from 'react';
import { TargetItem } from '../types';
import TargetComponent from './Target';

interface GameAreaProps {
  targets: TargetItem[];
  onTargetClick: (id: string) => void;
  isTurnActive: boolean;
}

const GameArea: React.FC<GameAreaProps> = ({ targets, onTargetClick, isTurnActive }) => {
  return (
    <div 
      className={`relative w-full h-80 sm:h-96 bg-slate-700 rounded-lg shadow-inner overflow-hidden mt-6 border-2 border-slate-600 
                  ${isTurnActive ? 'game-cursor-area' : 'cursor-default'}`}
      aria-live="polite" // Announces changes in targets for screen readers
    >
      {targets.map((target) => (
        <TargetComponent
          key={target.id}
          id={target.id}
          x={target.x}
          y={target.y}
          color={target.color}
          size={target.size}
          onClick={onTargetClick}
        />
      ))}
      {!isTurnActive && targets.length === 0 && ( // Show message if turn not active AND no targets (e.g., before turn starts)
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
          {/* Message will be handled by TurnTransitionScreen or GameOverScreen */}
        </div>
      )}
    </div>
  );
};

export default GameArea;
