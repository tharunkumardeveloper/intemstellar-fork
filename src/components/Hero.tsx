import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(18, 18, 23, 0.7), rgba(18, 18, 23, 0.95)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-primary/60 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/80 rounded-full animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center z-10 mt-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
          In<span className="text-primary text-glow">TEMS</span>tellar
        </h1>
        <p className="text-xl md:text-3xl text-muted-foreground mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Where Creativity Streams Beyond Limits
        </p>
        <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          An intercollegiate symposium celebrating innovation, storytelling, and creativity inspired by the world of web series
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-xl hover:shadow-primary/50 transition-all"
            onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Events
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6 transition-all"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
