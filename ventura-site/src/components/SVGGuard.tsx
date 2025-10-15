import { motion } from "framer-motion";

interface SVGGuardProps {
  className?: string;
  delay?: number;
  flip?: boolean;
}

const SVGGuard = ({ className = "", delay = 0, flip = false }: SVGGuardProps) => {
  return (
    <motion.div
      className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { 
          duration: 3, 
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
          delay 
        }
      }}
    >
      <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_0_20px_rgba(255,10,84,0.5)]">
        {/* Guard Body */}
        <rect x="70" y="140" width="60" height="120" fill="#FF0A54" rx="5" />
        
        {/* Guard Head/Mask - Triangle Shape */}
        <polygon 
          points="100,60 60,130 140,130" 
          fill="#2D0A1F"
          stroke="#FF0A54"
          strokeWidth="3"
        />
        
        {/* Mask Glow */}
        <motion.circle
          cx="100"
          cy="95"
          r="8"
          fill="#FF0A54"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay }}
          className="blur-sm"
        />
        
        {/* Arms */}
        <rect x="50" y="150" width="20" height="80" fill="#FF0A54" rx="5" />
        <rect x="130" y="150" width="20" height="80" fill="#FF0A54" rx="5" />
        
        {/* Legs */}
        <rect x="75" y="260" width="20" height="100" fill="#FF0A54" rx="5" />
        <rect x="105" y="260" width="20" height="100" fill="#FF0A54" rx="5" />
        
        {/* Details - Belt */}
        <rect x="70" y="200" width="60" height="8" fill="#000" />
      </svg>
    </motion.div>
  );
};

export default SVGGuard;
