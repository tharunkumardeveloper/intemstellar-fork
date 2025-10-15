import { Swords } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 border-t-4 border-primary">
      {/* Stone Texture Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card opacity-50" />
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_hsl(var(--gold-glow)/0.6)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Swords className="w-10 h-10 mx-auto mb-4 text-accent animate-ember-flicker" />
        
        <p className="text-lg md:text-xl font-display italic mb-6 text-muted-foreground">
          &quot;Every empire burns. But legends rise again.&quot;
        </p>
        
        <div className="flex items-center justify-center gap-2 text-foreground">
          <span className="text-primary">⚔️</span>
          <p className="font-display font-bold">
            &copy; 2025 CAPITALYZE &mdash; The Game of Business Thrones
          </p>
          <span className="text-primary">⚔️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
