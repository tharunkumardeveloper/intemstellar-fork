import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import zombieAnimation from "@/assets/zombie-loader.json";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#8f1414' }}
    >
      <div className="w-64 h-64 mb-8">
        <Lottie 
          animationData={zombieAnimation} 
          loop={true}
          className="w-full h-full"
        />
      </div>
      
      <div className="w-64 h-2 bg-black/30 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-white text-lg font-bold mt-4 uppercase tracking-wider">
        Loading {Math.round(progress)}%
      </p>
    </div>
  );
};

export default LoadingScreen;
