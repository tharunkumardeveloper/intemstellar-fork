import { motion } from "framer-motion";

interface SVGAudienceProps {
  className?: string;
  delay?: number;
}

const SVGAudience = ({ className = "", delay = 0 }: SVGAudienceProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{ 
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <svg viewBox="0 0 300 200" className="w-full h-full">
        {/* Multiple silhouettes representing audience */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${i * 60}, 0)`}>
            {/* Head */}
            <circle 
              cx="30" 
              cy="40" 
              r="20" 
              fill={i % 2 === 0 ? "#374151" : "#4B5563"} 
              opacity="0.8"
            />
            {/* Body */}
            <rect 
              x="15" 
              y="60" 
              width="30" 
              height="60" 
              fill={i % 2 === 0 ? "#374151" : "#4B5563"} 
              rx="3"
              opacity="0.8"
            />
            {/* Arms raised (cheering) */}
            <motion.rect 
              x="5" 
              y="70" 
              width="10" 
              height="30" 
              fill={i % 2 === 0 ? "#374151" : "#4B5563"}
              rx="2"
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
              style={{ transformOrigin: "5px 70px" }}
            />
            <motion.rect 
              x="45" 
              y="70" 
              width="10" 
              height="30" 
              fill={i % 2 === 0 ? "#374151" : "#4B5563"}
              rx="2"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
              style={{ transformOrigin: "55px 70px" }}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
};

export default SVGAudience;
