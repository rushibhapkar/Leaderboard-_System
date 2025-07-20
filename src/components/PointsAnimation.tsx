import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PointsAnimationProps {
  points: number | null;
  userName: string;
  onComplete: () => void;
}

const PointsAnimation: React.FC<PointsAnimationProps> = ({ points, userName, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (points !== null) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [points, onComplete]);

  if (points === null || !isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center transform animate-bounce-in">
        <div className="text-6xl mb-4">🎉</div>
        <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
        <p className="text-lg text-gray-700 mb-4">
          <strong>{userName}</strong> claimed
        </p>
        <div className="text-4xl font-bold text-green-600 mb-4">
          +{points} Points!
        </div>
        <p className="text-sm text-gray-500">Great job! 🚀</p>
      </div>
    </div>
  );
};

export default PointsAnimation;