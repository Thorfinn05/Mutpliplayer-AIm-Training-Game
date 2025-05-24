
import React from 'react';

interface TurnTransitionScreenProps {
  playerName: string; // Player whose turn is NEXT
  previousPlayerName?: string;
  previousPlayerScore?: number; 
  isAboutToStartFirstTurnInGame: boolean; 
  onProceed: () => void;
  isLastTurnTransition: boolean; 
}

const TurnTransitionScreen: React.FC<TurnTransitionScreenProps> = ({
  playerName,
  previousPlayerName,
  previousPlayerScore,
  isAboutToStartFirstTurnInGame,
  onProceed,
  isLastTurnTransition
}) => {

  let buttonText = "Start Turn";
  if (isLastTurnTransition) {
    buttonText = "Show Results";
  } else if (isAboutToStartFirstTurnInGame) {
    buttonText = "Start First Turn";
  } else {
    buttonText = "Start Next Turn";
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/95 text-center p-4 rounded-lg z-10"> {/* Increased z-index and opacity */}
      {previousPlayerName && previousPlayerScore !== undefined && (
         <p className="text-xl text-slate-300 mb-4">
           {previousPlayerName} scored: <span className="font-bold text-yellow-400">{previousPlayerScore}</span>
         </p>
       )}

      <h2 className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-4">
        {isLastTurnTransition ? "All Rounds Complete!" : `Get Ready, ${playerName}!`}
      </h2>
      
      {!isLastTurnTransition && (
        <p className="text-xl text-slate-200 mb-8">
            {isAboutToStartFirstTurnInGame ? "Your turn is about to begin." : "It's your turn!"}
        </p>
      )}

      {isLastTurnTransition && (
         <p className="text-xl text-slate-200 mb-8">Calculating final scores...</p>
      )}

      <button
        onClick={onProceed}
        className="px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-150 ease-in-out
                   bg-green-500 hover:bg-green-400 text-white focus:ring-4 focus:ring-green-300 transform hover:scale-105 active:scale-95"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TurnTransitionScreen;
