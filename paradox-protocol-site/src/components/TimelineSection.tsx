import { Clock, Search, Zap, Lightbulb } from "lucide-react";
import godParticle from "@/assets/god-particle.webp";

const rounds = [
  {
    number: 1,
    title: "The Analysis",
    subtitle: "Online",
    description: "Analyze the Winden Loop case study. Identify the root causes. Submit a creative solution report.",
    icon: Search,
  },
  {
    number: 2,
    title: "Echoes of the Past",
    subtitle: "Offline",
    description: "Decode 3 historical image clues and connect them to modern solutions.",
    icon: Clock,
  },
  {
    number: 3,
    title: "Flashback",
    subtitle: "Offline",
    description: "Scan QR fragments scattered across timelines. Some are truth. Some are glitches. Solve rapid innovation challenges.",
    icon: Zap,
  },
  {
    number: 4,
    title: "Prototype Demo + Mystery Card",
    subtitle: "Offline Finale",
    description: "Present your prototype to restore Winden. But beware — fate may change the rules. Adapt fast, or remain trapped.",
    icon: Lightbulb,
  },
];

const TimelineSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        {/* God particle image */}
        <div className="mb-8 sm:mb-12 rounded-lg overflow-hidden border border-border max-w-4xl mx-auto">
          <img
            src={godParticle}
            alt="The God Particle"
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
          />
        </div>

        <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
          THE TIMELINE
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {rounds.map((round, index) => {
            const Icon = round.icon;
            return (
              <div
                key={round.number}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card border border-border hover:border-primary/50 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-2">
                        <span className="font-orbitron text-xs sm:text-sm text-muted-foreground">
                          ROUND {round.number}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                          {round.subtitle}
                        </span>
                      </div>
                      
                      <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-primary">
                        {round.title}
                      </h3>
                      
                      <p className="font-inter text-sm sm:text-base text-foreground/80 leading-relaxed">
                        {round.description}
                      </p>
                    </div>

                    {/* Round Number - Hidden on mobile */}
                    <div className="hidden lg:block font-orbitron text-5xl xl:text-6xl font-black text-muted/10 group-hover:text-muted/20 transition-colors">
                      0{round.number}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < rounds.length - 1 && (
                  <div className="absolute left-6 sm:left-8 top-full h-6 sm:h-8 w-px bg-gradient-to-b from-border to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
