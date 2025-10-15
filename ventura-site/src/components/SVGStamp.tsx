import { motion } from "framer-motion";

interface SVGStampProps {
  className?: string;
  delay?: number;
  text?: "SOLD" | "UNSOLD";
}

const SVGStamp = ({ className = "", delay = 0, text = "SOLD" }: SVGStampProps) => {
  const color = text === "SOLD" ? "#10B981" : "#EF4444";
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
      animate={{ 
        opacity: 1, 
        scale: [1, 1.1, 1],
        rotate: 0
      }}
      transition={{ 
        opacity: { duration: 0.5, delay },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 0.5, delay }
      }}
    >
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {/* Stamp Border */}
        <rect 
          x="20" 
          y="40" 
          width="260" 
          height="120" 
          fill="none" 
          stroke={color}
          strokeWidth="8"
          strokeDasharray="10,10"
          rx="10"
        />
        <rect 
          x="30" 
          y="50" 
          width="240" 
          height="100" 
          fill="none" 
          stroke={color}
          strokeWidth="4"
          rx="8"
        />
        
        {/* Text */}
        <text 
          x="150" 
          y="115" 
          textAnchor="middle" 
          fill={color}
          fontSize="60" 
          fontWeight="bold"
          fontFamily="monospace"
          opacity="0.9"
        >
          {text}
        </text>
        
        {/* Stamp Texture Lines */}
        <line x1="40" y1="70" x2="260" y2="70" stroke={color} strokeWidth="1" opacity="0.3" />
        <line x1="40" y1="130" x2="260" y2="130" stroke={color} strokeWidth="1" opacity="0.3" />
      </svg>
    </motion.div>
  );
};

export default SVGStamp;
