import { Crown } from 'lucide-react';
import { Button } from './ui/button';
import heroImage from '@/assets/throne-hero.jpg';

const HeroSection = () => {
  const scrollToDescription = () => {
    document.getElementById('event-description')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.3)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      
      {/* Fire Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <Crown className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 text-primary animate-glow-pulse" />
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-gold-glow">
          CAPITALYZE
        </h1>
        
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-display mb-8 text-foreground">
          The Game of Business Thrones
        </h2>
        
        <p className="text-lg md:text-2xl mb-4 text-muted-foreground max-w-3xl mx-auto">
          Welcome to the ultimate boardroom battlefield — where empires rise and fall.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xl md:text-2xl font-display mb-12">
          <span className="hover-gold-glow">Strategize ⚡</span>
          <span className="hidden md:inline text-primary">•</span>
          <span className="hover-gold-glow">Dominate ⚔️</span>
          <span className="hidden md:inline text-primary">•</span>
          <span className="hover-gold-glow">Capitalyze 👑</span>
        </div>
        
        <Button
          size="lg"
          onClick={scrollToDescription}
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg md:text-xl px-8 py-6 font-display font-bold shadow-[0_0_30px_hsl(var(--gold-glow)/0.5)] hover:shadow-[0_0_50px_hsl(var(--gold-glow)/0.8)] transition-all duration-300 hover:scale-105"
        >
          Enter the Boardroom
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
