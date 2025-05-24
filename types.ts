export interface TargetItem {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  color: string;
  size: number; // size in pixels
  createdAt: number; // timestamp of creation for lifespan
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export type Difficulty = 'EASY' | 'MODERATE' | 'HARD';

export type GamePhase =
  | 'DIFFICULTY_SELECT'
  | 'SETUP'
  | 'NAME_INPUT'
  | 'ROUND_TRANSITION'
  | 'PLAYING'
  | 'GAME_OVER';