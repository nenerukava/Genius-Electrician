// Fix: Create GameScreen component and fix Gemini API usage
import React, { useState, useEffect, useCallback } from 'react';
// Fix: Use GoogleGenAI from "@google/genai" as per guidelines
import { GoogleGenAI } from "@google/genai";
import Character from './Character';
import ProgressBar from './ProgressBar';
import Timer from './Timer';
import MiniGameModal from './QuizModal';
import { MiniGame, MiniGameType, QuizQuestion, MatchingGame, MatchingPair } from '../types';
import { TOTAL_LEVELS } from '../constants';
import * as Icons from './Icons';

// Fix: Initialize GoogleGenAI with a named apiKey parameter as per guidelines
const ai = new GoogleGenAI({apiKey: process.env.API_KEY || ""});

const generateMiniGame = async (level: number): Promise<MiniGame> => {
    const gameType = Math.random() > 0.5 ? MiniGameType.QUIZ : MiniGameType.MATCHING;

    if (gameType === MiniGameType.QUIZ) {
        const prompt = `Create a multiple-choice quiz question about basic electrical safety or tools for an electrician game. The question should be in Thai. Provide 4 options and indicate the correct answer index. The target audience is general public. Difficulty should increase slightly with level ${level + 1}. Format the output as a JSON object with keys: "question" (string), "options" (array of 4 strings), and "correctAnswerIndex" (number from 0 to 3).`;
        
        try {
            // Fix: Use ai.models.generateContent and the recommended model 'gemini-2.5-flash'
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json'
              }
            });
            // Fix: Access text directly from the response object
            const text = response.text;
            const parsedJson = JSON.parse(text.replace(/```json|```/g, ''));
            return { type: MiniGameType.QUIZ, ...parsedJson };
        } catch (error) {
            console.error("Error generating quiz game:", error);
            // Fallback quiz question
            return {
                type: MiniGameType.QUIZ,
                question: 'อุปกรณ์ใดใช้ป้องกันไฟฟ้าดูด?',
                options: ['เบรกเกอร์', 'หลอดไฟ', 'สวิตช์', 'สายไฟ'],
                correctAnswerIndex: 0,
            };
        }
    } else { // Matching Game
        const prompt = `Create a word matching game in Thai for an electrician-themed game. The game should consist of 4 pairs of words that are related to each other (e.g., tool and object, cause and effect, synonyms). Also, provide a fun, short title for the game. Format the output as a single JSON object with two keys: "title" (a string) and "pairs" (an array of 4 arrays, where each inner array contains two related Thai strings). Example: {"title": "จับคู่คำศัพท์ช่างไฟ", "pairs": [["ค้อน", "ตะปู"], ["ไขควง", "สกรู"]]}`;

        try {
            // Fix: Use ai.models.generateContent and the recommended model 'gemini-2.5-flash'
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json'
              }
            });
            // Fix: Access text directly from the response object
            const text = response.text;
            const parsedJson = JSON.parse(text.replace(/```json|```/g, ''));
            
            const gamePairs: MatchingPair[] = parsedJson.pairs.flatMap((p: string[], index: number) => ([
                { id: index + 1, content: p[0], type: 'text' },
                { id: index + 1, content: p[1], type: 'text' },
            ]));

            return { type: MiniGameType.MATCHING, title: parsedJson.title, pairs: gamePairs };
        } catch (error) {
            console.error("Error generating matching game:", error);
            // Fallback matching game
            const fallbackTitle = 'จับคู่คำที่เกี่ยวข้องกัน';
            const fallbackPairsData = [
                ['ไฟฟ้า', 'อันตราย'],
                ['ค้อน', 'ตะปู'],
                ['ไขควง', 'สกรู'],
                ['สวิตช์', 'เปิด-ปิด'],
            ];

            const gamePairs: MatchingPair[] = fallbackPairsData.flatMap((p, index) => ([
                { id: index + 1, content: p[0], type: 'text' },
                { id: index + 1, content: p[1], type: 'text' },
            ]));
            
             return {
                type: MiniGameType.MATCHING,
                title: fallbackTitle,
                pairs: gamePairs
            };
        }
    }
};


interface GameScreenProps {
  playerName: string;
  onGameEnd: (score: number, time: number) => void;
  isMuted: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ playerName, onGameEnd, isMuted }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [miniGame, setMiniGame] = useState<MiniGame | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setTime(prevTime => prevTime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);
  
  const loadMiniGame = useCallback(async () => {
    setIsLoading(true);
    setIsPaused(true);
    const game = await generateMiniGame(currentLevel);
    setMiniGame(game);
    setIsLoading(false);
  }, [currentLevel]);
  
  useEffect(() => {
    loadMiniGame();
  }, [currentLevel, loadMiniGame]);

  const handleMiniGameComplete = (isCorrect: boolean) => {
    setMiniGame(null);
    let newScore = score;
    if (isCorrect) {
      newScore = score + 100 + (TOTAL_LEVELS - currentLevel) * 10;
      setScore(newScore);
    }
    
    if (currentLevel + 1 >= TOTAL_LEVELS) {
      onGameEnd(newScore, time);
    } else {
      setCurrentLevel(prev => prev + 1);
      setIsPaused(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-900 flex flex-col items-center justify-between p-4 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05)_0%,_rgba(255,255,255,0)_20%),radial-gradient(circle_at_bottom_right,_rgba(251,211,77,0.1)_0%,_rgba(251,211,77,0)_25%)]"></div>

      <header className="w-full max-w-4xl flex justify-between items-center z-10">
        <div className="bg-white/20 backdrop-blur-sm p-2 px-4 rounded-lg text-white text-xl font-semibold shadow-lg border border-white/30">
          ผู้เล่น: {playerName}
        </div>
        <Timer time={time} />
      </header>

      <main className="flex-grow flex items-center justify-center z-10">
        {isLoading && !miniGame ? (
          <div className="text-center">
             <Icons.LightningBoltIcon className="w-16 h-16 text-yellow-300 animate-pulse mx-auto" />
             <p className="text-2xl mt-4">กำลังสร้างด่านต่อไป...</p>
          </div>
        ) : (
            <Character level={currentLevel} />
        )}
      </main>

      <footer className="w-full max-w-4xl z-10">
        <ProgressBar currentLevel={currentLevel} />
      </footer>
      
      {miniGame && !isLoading && (
        <MiniGameModal
          miniGame={miniGame}
          onComplete={handleMiniGameComplete}
          level={currentLevel}
        />
      )}
    </div>
  );
};

export default GameScreen;