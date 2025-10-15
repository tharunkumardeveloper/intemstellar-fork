import { useEffect, useState } from 'react';
import loadingGif from '@/assets/loading-knight.gif';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000"
      style={{
        backgroundColor: '#cbccc0',
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? 'none' : 'auto',
      }}
    >
      <img
        src={loadingGif}
        alt="Loading"
        className="w-80 h-80 md:w-[32rem] md:h-[32rem] object-contain mb-8"
      />
      <div className="text-center">
        <p className="text-3xl md:text-4xl font-bold" style={{ color: '#000' }}>
          {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
