// Fix: Create the main App component to manage game state
import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';
import { GameState, HighScore } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [highScores, setHighScores] = useState<HighScore[]>(() => {
    try {
      const savedScores = localStorage.getItem('highScores');
      return savedScores ? JSON.parse(savedScores) : [];
    } catch (error) {
      console.error("Could not parse high scores from localStorage", error);
      return [];
    }
  });
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    try {
        localStorage.setItem('highScores', JSON.stringify(highScores));
    } catch (error) {
        console.error("Could not save high scores to localStorage", error);
    }
  }, [highScores]);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setScore(0);
    setTime(0);
    setGameState(GameState.PLAYING);
  };

  const handleGameEnd = (finalScore: number, finalTime: number) => {
    setScore(finalScore);
    setTime(finalTime);
    setHighScores(prevScores => [...prevScores, { name: playerName, score: finalScore, time: finalTime }]);
    setGameState(GameState.FINISHED);
  };

  const handleRestart = () => {
    setGameState(GameState.START);
  };
  
  const handleToggleMute = () => {
    setIsMuted(prev => !prev);
  }

  const renderContent = () => {
    switch (gameState) {
      case GameState.PLAYING:
        return <GameScreen playerName={playerName} onGameEnd={handleGameEnd} isMuted={isMuted} />;
      case GameState.FINISHED:
        return <EndScreen score={score} time={time} playerName={playerName} highScores={highScores} onRestart={handleRestart} />;
      case GameState.START:
      default:
        return <StartScreen onStartGame={handleStartGame} isMuted={isMuted} onToggleMute={handleToggleMute} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
};

export default App;
