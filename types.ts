import React from 'react';

export enum GameState {
  START,
  PLAYING,
  FINISHED
}

export enum MiniGameType {
  QUIZ,
  MATCHING
}

export interface QuizQuestion {
  type: MiniGameType.QUIZ;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

// FIX: Converted MatchingPair to a discriminated union for better type safety.
// This ensures that the `content` type is correctly inferred based on the `type` property.
type MatchingPairIcon = {
  id: number;
  content: React.FC<{className?: string}>;
  type: 'icon';
};

type MatchingPairText = {
  id: number;
  content: string;
  type: 'text';
};

type MatchingPairImage = {
  id: number;
  content: string;
  type: 'image';
};

export type MatchingPair = MatchingPairIcon | MatchingPairText | MatchingPairImage;

export interface MatchingGame {
  type: MiniGameType.MATCHING;
  title: string;
  pairs: MatchingPair[];
}

export type MiniGame = QuizQuestion | MatchingGame;

export interface HighScore {
  name: string;
  score: number;
  time: number;
}
