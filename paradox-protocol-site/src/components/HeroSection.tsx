import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById("storyline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-6 leading-tight">
          THE PARADOX
          <br />
          PROTOCOL
        </h1>
        
        <p className="font-inter text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-muted-foreground px-4">
          Reimagine. Rebuild.{" "}
          <span className="text-primary animate-glitch inline-block">
            Redefine Reality.
          </span>
        </p>

        <div className="h-px w-32 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent my-6 sm:my-8" />

        <Button
          onClick={scrollToContent}
          size="lg"
          className="font-orbitron text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
        >
          ENTER THE LOOP
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
