import { Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-12 sm:py-16 px-4 border-t border-border">
      {/* Static effect background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            hsl(var(--foreground)) 0px,
            transparent 1px,
            transparent 2px,
            hsl(var(--foreground)) 3px
          )`
        }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Quote */}
        <p className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-muted-foreground/70 px-4">
          "Time is a circle.
          <br />
          <span className="text-primary">Until next loop...</span>"
        </p>

        {/* Divider */}
        <div className="h-px w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-border to-transparent mb-6 sm:mb-8" />

        {/* Social Links */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <a
            href="#"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border hover:border-primary flex items-center justify-center transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>
        </div>

        {/* Copyright */}
        <p className="font-inter text-xs sm:text-sm text-muted-foreground px-4">
          Copyright © 2025 The Paradox Protocol
        </p>

        {/* Binary footer */}
        <p className="font-mono text-xs text-muted-foreground/30 mt-3 sm:mt-4 tracking-widest overflow-x-auto">
          <span className="inline-block">01010000 01000001 01010010 01000001 01000100 01001111 01011000</span>
        </p>
      </div>

      {/* Corner decorations - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 border-l border-b border-border/30 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 border-r border-b border-border/30 pointer-events-none" />
    </footer>
  );
};

export default FooterSection;
