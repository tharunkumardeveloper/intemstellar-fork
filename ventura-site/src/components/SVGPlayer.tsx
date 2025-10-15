import { motion } from "framer-motion";

interface SVGPlayerProps {
  className?: string;
  delay?: number;
  number?: string;
}

const SVGPlayer = ({ className = "", delay = 0, number = "001" }: SVGPlayerProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 0.6, x: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
        {/* Player Body - Green Tracksuit */}
        <rect x="70" y="140" width="60" height="120" fill="#059669" rx="5" />
        
        {/* Player Head */}
        <circle cx="100" cy="100" r="35" fill="#D1D5DB" />
        
        {/* Number on Chest */}
        <text 
          x="100" 
          y="200" 
          textAnchor="middle" 
          fill="#FFF" 
          fontSize="32" 
          fontWeight="bold"
          fontFamily="monospace"
        >
          {number}
        </text>
        
        {/* Arms */}
        <rect x="50" y="150" width="20" height="80" fill="#059669" rx="5" />
        <rect x="130" y="150" width="20" height="80" fill="#059669" rx="5" />
        
        {/* Legs */}
        <rect x="75" y="260" width="20" height="100" fill="#059669" rx="5" />
        <rect x="105" y="260" width="20" height="100" fill="#059669" rx="5" />
      </svg>
    </motion.div>
  );
};

export default SVGPlayer;
