import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/red-guard-animation.json";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [showText, setShowText] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    const completeTimer = setTimeout(onComplete, 3500);
    
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.86; // Will reach 100 in ~3.5 seconds
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: '#0b0101' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center px-4 max-w-md w-full">
        {showText && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="w-64 h-64 mx-auto md:w-96 md:h-96">
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                  autoplay={true}
                />
              </div>
            </motion.div>
            
            <motion.h1
              className="font-bebas text-4xl sm:text-5xl md:text-7xl text-primary text-glow-intense mb-4"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ 
                opacity: 1, 
                letterSpacing: "0.1em",
              }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              VENTURA
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full max-w-xs mx-auto"
            >
              <Progress value={progress} className="h-2 bg-muted" />
              <p className="font-orbitron text-xs text-muted-foreground mt-2 tracking-wider">
                LOADING... {Math.round(progress)}%
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
