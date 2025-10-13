import { useState } from "react";

interface Coordinator {
  name: string;
  phone: string;
  year: string;
}

interface EventCardProps {
  title: string;
  theme: string;
  tagline: string;
  coordinators: Coordinator[];
  image: string;
  accentColor: string;
  delay: number;
}

const EventCard = ({ title, theme, tagline, coordinators, image, accentColor, delay }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer hover-tilt animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image Background */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"
        />
        
        {/* Accent Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
          <p className="text-sm font-semibold text-muted-foreground mb-2 tracking-wider uppercase">
            Theme: {theme}
          </p>
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-foreground group-hover:text-glow">
            {title}
          </h3>
          <p className="text-lg md:text-xl font-semibold mb-6" style={{ color: accentColor }}>
            {tagline}
          </p>

          {/* Coordinators - Show on Hover */}
          <div
            className={`transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
              Coordinators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coordinators.map((coord, idx) => (
                <div key={idx} className="bg-card/50 backdrop-blur-sm p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{coord.name}</p>
                  <p className="text-xs text-muted-foreground">{coord.phone}</p>
                  <p className="text-xs text-primary font-medium">{coord.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Border Glow on Hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${accentColor}`,
        }}
      />
    </div>
  );
};

export default EventCard;
