
import React from 'react';

export interface TargetComponentProps {
  id: string;
  x: number; // percentage
  y: number; // percentage
  color: string;
  size: number; // size in pixels
  onClick: (id: string) => void;
}

const TargetComponent: React.FC<TargetComponentProps> = ({ id, x, y, color, size, onClick }) => {
  return (
    <div
      className={`absolute ${color} rounded-full transform transition-all duration-75 hover:scale-110 active:scale-95 shadow-md hover:shadow-lg border-2 border-white/30`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(-50%, -50%)`, // Center the target on its x,y coordinates
      }}
      onClick={() => onClick(id)}
      role="button"
      aria-label="target"
    />
  );
};

export default TargetComponent;
