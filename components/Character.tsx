// Fix: Create Character component
import React from 'react';
import { SafetyHelmetIcon, WrenchIcon } from './Icons';

interface CharacterProps {
  level: number;
}

const Character: React.FC<CharacterProps> = ({ level }) => {
  const messages = [
    "เริ่มภารกิจกันเลย!",
    "ง่ายเหมือนปอกกล้วย!",
    "ไปต่อเลย!",
    "ใกล้แล้ว!",
    "เยี่ยมมาก!",
    "ฉลุยเลย!",
    "พลังเต็มเปี่ยม!",
    "สุดยอดไอเดีย!",
    "ภารกิจคืบหน้า!",
    "โค้งสุดท้ายแล้ว!"
  ];
  
  const message = messages[level] || messages[messages.length - 1];

  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg text-white mb-4 shadow-lg border border-white/30 text-center relative">
        <p className="font-semibold">{message}</p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-white/20"></div>
      </div>
      <div className="relative w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500"></div>
        <SafetyHelmetIcon className="w-24 h-24 text-white z-10" />
        <WrenchIcon className="absolute bottom-4 right-0 w-12 h-12 text-white/80 transform rotate-12 z-10" />
      </div>
      <p className="mt-4 text-2xl font-bold text-white" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.5)'}}>ช่างไฟฝึกหัด</p>
    </div>
  );
};

export default Character;
