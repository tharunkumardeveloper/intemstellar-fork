import { Users, Phone } from "lucide-react";
import graveyard from "@/assets/graveyard.jpg";

const coordinators = [
  {
    name: "Varshini Elumalai Palani",
    year: "2nd Year",
    phone: "86678 01807",
  },
  {
    name: "Harsha Nandhini K",
    year: "2nd Year",
    phone: "98403 35963",
  },
  {
    name: "Surya A",
    year: "3rd Year",
    phone: "79044 61620",
  },
];

const CoordinatorsSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Graveyard image */}
        <div className="mb-8 sm:mb-12 rounded-lg overflow-hidden border border-border max-w-4xl mx-auto">
          <img
            src={graveyard}
            alt="The journey through time"
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
          />
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-primary" />
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            THE COUNCIL
          </h2>
          <p className="font-inter text-sm sm:text-base text-muted-foreground">
            Guardians of the timeline
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {coordinators.map((coordinator, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border hover:border-primary/50 rounded-lg p-6 sm:p-8 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 border border-primary/10 rounded-full group-hover:border-primary/30 transition-all duration-300" />
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 sm:w-12 sm:h-12 border border-primary/10 rounded-full group-hover:border-primary/30 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="font-orbitron text-lg sm:text-xl font-bold mb-2 text-primary transition-all">
                  {coordinator.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  {coordinator.year}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-muted/30 rounded-lg border border-border group-hover:border-primary/30 transition-all">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href={`tel:+91${coordinator.phone.replace(/\s/g, "")}`}
                    className="font-mono text-xs sm:text-sm text-foreground/90 hover:text-primary transition-colors"
                  >
                    {coordinator.phone}
                  </a>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
