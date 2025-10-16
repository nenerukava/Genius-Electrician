import React from 'react';
import { TOTAL_LEVELS } from '../constants';
import { LightningBoltIcon, XIcon } from './Icons';

interface HowToPlayModalProps {
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="how-to-play-title">
      <div className="bg-gradient-to-br from-purple-800 to-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl border-4 border-yellow-400/80 relative text-white">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors" aria-label="Close">
          <XIcon className="w-8 h-8" />
        </button>
        <h2 id="how-to-play-title" className="text-4xl font-bold text-center mb-6 text-yellow-300">วิธีการเล่น</h2>
        
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 flex items-center"><LightningBoltIcon className="w-6 h-6 mr-2 text-yellow-400" />เป้าหมายของเกม</h3>
          <p className="text-lg text-purple-200">
            สวมบทบาทเป็นช่างไฟอัจฉริยะ! ภารกิจของคุณคือการแก้ไขปัญหาไฟฟ้าขัดข้องทั้งหมด {TOTAL_LEVELS} ด่านให้เร็วที่สุด ในแต่ละด่าน คุณจะต้องผ่านมินิเกมเพื่อไปต่อ
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">มินิเกม</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <h4 className="text-xl font-bold text-yellow-200 mb-2">เกมตอบคำถาม</h4>
              <p className="text-purple-200">อ่านคำถามเกี่ยวกับไฟฟ้าและความปลอดภัย แล้วเลือกคำตอบที่ถูกต้องที่สุดจาก 4 ตัวเลือก</p>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <h4 className="text-xl font-bold text-yellow-200 mb-2">เกมจับคู่</h4>
              <p className="text-purple-200">เปิดการ์ดเพื่อค้นหาภาพหรือข้อความที่เข้าคู่กัน จับคู่ให้ครบทั้งหมดเพื่อผ่านด่าน</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">ระบบคะแนน</h3>
          <ul className="list-disc list-inside text-lg text-purple-200 space-y-1">
            <li>ตอบคำถามหรือเล่นมินิเกมสำเร็จ รับ <span className="font-bold text-white">100</span> คะแนน</li>
            <li>รับคะแนนโบนัสพิเศษจากด่านที่เหลืออยู่ ยิ่งเล่นด่านสูงๆ โบนัสยิ่งน้อย รีบทำคะแนน!</li>
            <li>ทำคะแนนให้สูงที่สุดเพื่อติดอันดับใน "ทำเนียบช่างไฟอัจฉริยะ"!</li>
          </ul>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default HowToPlayModal;
