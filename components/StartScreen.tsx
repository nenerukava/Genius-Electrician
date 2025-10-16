import React, { useState } from 'react';
import { LightningBoltIcon, WrenchIcon, ScrewdriverIcon, SafetyHelmetIcon, SpeakerOnIcon, SpeakerOffIcon } from './Icons';
import HowToPlayModal from './HowToPlayModal';

interface StartScreenProps {
  onStartGame: (name: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, isMuted, onToggleMute }) => {
  const [name, setName] = useState('');
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStartGame(name.trim());
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-purple-800 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0)_60%)]"></div>
          
          <div className="absolute top-4 right-4 z-20">
              <button onClick={onToggleMute} className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors" aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}>
                  {isMuted ? <SpeakerOffIcon className="w-6 h-6" /> : <SpeakerOnIcon className="w-6 h-6" />}
              </button>
          </div>

          <SafetyHelmetIcon className="absolute -top-8 -left-12 w-48 h-48 text-yellow-400 opacity-20 transform -rotate-12" />
          <WrenchIcon className="absolute bottom-4 -right-8 w-40 h-40 text-purple-400 opacity-20 transform rotate-12" />
          <ScrewdriverIcon className="absolute top-1/2 -right-4 w-32 h-32 text-purple-400 opacity-20 transform -rotate-45" />

        <div className="relative text-center mb-8 z-10">
          <LightningBoltIcon className="w-24 h-24 text-yellow-300 mx-auto drop-shadow-[0_0_15px_rgba(252,211,77,0.8)]" />
          <h1 className="text-6xl font-bold mt-4 drop-shadow-md" style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.5)' }}>ช่างไฟอัจฉริยะ</h1>
          <p className="text-3xl font-semibold text-purple-200 mt-2">PEA เชียงใหม่ 2</p>
        </div>
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 w-full max-w-md z-10">
          <form onSubmit={handleSubmit}>
            <label htmlFor="playerName" className="block text-lg font-semibold mb-2 text-purple-100">
              ใส่ชื่อของคุณ:
            </label>
            <input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white text-xl placeholder-purple-200/70 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
              placeholder="ชื่อช่างไฟ..."
              maxLength={15}
              aria-required="true"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-br from-yellow-400 to-amber-500 text-purple-900 font-bold text-2xl p-4 mt-6 rounded-lg disabled:from-gray-500 disabled:to-gray-600 disabled:text-white/70 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              เริ่มภารกิจ
            </button>
          </form>
           <div className="text-center mt-4">
            <button 
              onClick={() => setShowHowToPlay(true)}
              className="text-purple-200 hover:text-yellow-300 transition-colors font-semibold"
              aria-label="เปิดหน้าต่างวิธีการเล่น"
            >
              วิธีการเล่น
            </button>
          </div>
        </div>
      </div>
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}
    </>
  );
};

export default StartScreen;
