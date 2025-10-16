import React, { useState, useEffect, useMemo } from 'react';
import { MiniGame, MiniGameType, QuizQuestion, MatchingGame, MatchingPair } from '../types';
import { CheckIcon, XIcon } from './Icons';

interface MiniGameModalProps {
  miniGame: MiniGame;
  onComplete: (isCorrect: boolean) => void;
  level: number;
}

// Helper to shuffle array
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Quiz Game Component ---
const QuizGame: React.FC<{ question: QuizQuestion; onAnswer: (isCorrect: boolean) => void; }> = ({ question, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerClick = (index: number) => {
        if (isAnswered) return;
        setSelectedAnswer(index);
        setIsAnswered(true);
        const isCorrect = index === question.correctAnswerIndex;
        setTimeout(() => onAnswer(isCorrect), 1500);
    };

    const getButtonClass = (index: number) => {
        if (!isAnswered) return 'bg-purple-500 hover:bg-purple-400 text-white';
        if (index === question.correctAnswerIndex) return 'bg-green-500 text-white animate-pulse';
        if (index === selectedAnswer) return 'bg-red-500 text-white';
        return 'bg-purple-500 text-white opacity-50';
    };

    return (
        <>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">{question.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={isAnswered}
                        className={`p-4 rounded-lg text-lg font-semibold transition-all duration-300 transform flex items-center justify-between shadow-lg ${getButtonClass(index)} ${!isAnswered ? 'hover:scale-105' : 'cursor-not-allowed'}`}
                    >
                        <span>{option}</span>
                        {isAnswered && index === question.correctAnswerIndex && <CheckIcon className="w-6 h-6" />}
                        {isAnswered && index === selectedAnswer && <XIcon className="w-6 h-6" />}
                    </button>
                ))}
            </div>
        </>
    );
};

// --- Matching Game Component ---
const MatchingGameComponent: React.FC<{ game: MatchingGame; onComplete: () => void; }> = ({ game, onComplete }) => {
    const shuffledPairs = useMemo(() => shuffleArray(game.pairs), [game]);
    const [selected, setSelected] = useState<MatchingPair[]>([]);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);

    useEffect(() => {
        if (selected.length === 2) {
            const [first, second] = selected;
            if (first.id === second.id) {
                setMatchedIds(prev => [...prev, first.id]);
                setSelected([]);
            } else {
                setTimeout(() => setSelected([]), 1000);
            }
        }
    }, [selected]);
    
    useEffect(() => {
        if (matchedIds.length === game.pairs.length / 2) {
            setTimeout(() => onComplete(), 1000);
        }
    }, [matchedIds, game.pairs.length, onComplete]);

    const handleSelect = (pair: MatchingPair) => {
        if (selected.length < 2 && !selected.includes(pair) && !matchedIds.includes(pair.id)) {
            setSelected(prev => [...prev, pair]);
        }
    };

    const getCardClass = (pair: MatchingPair) => {
        if (matchedIds.includes(pair.id)) return 'bg-green-500/80 text-white transform scale-95 opacity-70';
        if (selected.includes(pair)) return 'bg-yellow-400 text-black ring-4 ring-white transform rotate-y-180';
        return 'bg-white hover:bg-yellow-100 text-gray-800';
    };
    
    // FIX: Removed unnecessary type casting. With the new discriminated union for MatchingPair,
    // TypeScript can correctly infer the type of `pair.content` within the switch statement.
    const renderCardContent = (pair: MatchingPair) => {
        switch (pair.type) {
            case 'icon':
                const IconComponent = pair.content;
                return <IconComponent className="w-12 h-12" />;
            case 'image':
                return <img src={pair.content} alt="ไอเทมจับคู่" className="w-full h-full object-contain p-2" />;
            case 'text':
                return <span className="text-lg font-semibold">{pair.content}</span>;
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">{game.title}</h2>
            <div className="grid grid-cols-4 gap-4" style={{ perspective: '1000px' }}>
                {shuffledPairs.map((pair, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(pair)}
                        disabled={matchedIds.includes(pair.id) || selected.length === 2}
                        className={`h-24 rounded-lg font-semibold transition-all duration-500 flex items-center justify-center p-2 text-center shadow-lg ${getCardClass(pair)}`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="backface-hidden">
                            {renderCardContent(pair)}
                        </div>
                    </button>
                ))}
            </div>
            <img 
              src="https://i.ibb.co/b3dYvjJ/electrician-cartoon.png" 
              alt="ช่างไฟฟ้า"
              className="absolute -bottom-24 -right-12 md:-bottom-20 md:-right-16 w-32 h-auto pointer-events-none transform -scale-x-100"
              style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.4))' }}
            />
        </div>
    );
};

const MiniGameModal: React.FC<MiniGameModalProps> = ({ miniGame, onComplete, level }) => {
  const renderGame = () => {
    switch (miniGame.type) {
      case MiniGameType.QUIZ:
        return <QuizGame question={miniGame} onAnswer={onComplete} />;
      case MiniGameType.MATCHING:
        return <MatchingGameComponent game={miniGame} onComplete={() => onComplete(true)} />;
      default:
        return <p className="text-white">Loading game...</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-800 to-purple-900 p-8 rounded-2xl shadow-2xl w-full max-w-4xl border-4 border-yellow-400/80 transform transition-all animate-fade-in-up relative overflow-visible">
        <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-yellow-300 tracking-wider">ด่านที่ {level + 1} : แก้ไขไฟฟ้าขัดข้อง</h3>
        </div>
        {renderGame()}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        
        .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
            transform: rotateY(180deg);
        }
        @keyframes ping-once {
            0% { transform: scale(1); opacity: 0.75; }
            50% { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
        }
        .animate-ping-once {
            animation: ping-once 0.75s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default MiniGameModal;
