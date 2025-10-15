import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import loadingGif from "@/assets/loading.gif";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`flex flex-col items-center gap-6 max-w-2xl w-full px-4 transition-transform duration-700 ${isExiting ? 'scale-95' : 'scale-100'}`}>
        <img
          src={loadingGif}
          alt="Loading"
          className="w-[500px] h-[500px] object-contain"
        />
        
        <div className="w-full space-y-3">
          <Progress value={progress} className="h-2 [&>div]:bg-white" />
          <p className="font-orbitron text-sm text-center text-muted-foreground">
            INITIALIZING PARADOX PROTOCOL...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
