import { Button } from './ui/button';
import { Flame } from 'lucide-react';
import throneImage from '@/assets/iron-throne.jpg';

const RegistrationCTA = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${throneImage})`,
          filter: 'brightness(0.2)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      {/* Fire Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-float-up"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Flame className="w-16 h-16 mx-auto mb-6 text-accent animate-ember-flicker" />
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gold-glow">
          Call to Arms
        </h2>
        
        <p className="text-xl md:text-2xl lg:text-3xl font-display mb-4 text-foreground">
          The Iron Throne of Business awaits.
        </p>
        
        <p className="text-lg md:text-xl mb-8 text-muted-foreground">
          Do you have the strategy to seize it?
        </p>
        
        <div className="mb-8">
        <p className="text-2xl md:text-3xl font-display font-bold text-accent mb-2">
          🔥 Join the War of Wits &mdash; Register Now! 🔥
        </p>
        </div>
        
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl md:text-2xl px-12 py-8 font-display font-bold shadow-[0_0_40px_hsl(var(--gold-glow)/0.6)] hover:shadow-[0_0_60px_hsl(var(--gold-glow)/1)] transition-all duration-300 hover:scale-110"
        >
          Join the Realm
        </Button>
        
        <p className="mt-6 text-sm md:text-base text-muted-foreground font-display">
          Forge your legacy before the boardroom gates close.
        </p>
      </div>
    </section>
  );
};

export default RegistrationCTA;
