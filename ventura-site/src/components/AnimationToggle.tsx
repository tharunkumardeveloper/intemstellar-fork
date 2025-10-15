import { motion } from "framer-motion";
import { Film, FilmIcon } from "lucide-react";
import { useAnimations } from "@/contexts/AnimationContext";

const AnimationToggle = () => {
  const { animationsEnabled, toggleAnimations } = useAnimations();

  return (
    <motion.button
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      onClick={toggleAnimations}
      className="fixed top-6 right-6 z-50 p-3 bg-card border-2 border-primary/50 rounded-lg hover:border-primary transition-all duration-300 box-glow"
      title={`${animationsEnabled ? 'Disable' : 'Enable'} character animations`}
    >
      {animationsEnabled ? (
        <Film className="w-6 h-6 text-primary" />
      ) : (
        <FilmIcon className="w-6 h-6 text-muted-foreground" />
      )}
    </motion.button>
  );
};

export default AnimationToggle;
