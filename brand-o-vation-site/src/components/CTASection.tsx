import { useState } from "react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "./RegistrationModal";
import zombiesFog from "@/assets/zombies-fog.jpg";
import wheel1 from "@/assets/wheel-1.jpg";

const CTASection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-muted to-background">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 opacity-15"
          style={{
            backgroundImage: `url(${zombiesFog})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/70 z-10"></div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl relative z-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Wheel Image - Left Side */}
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img src={wheel1} alt="Wheel of Survival" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="order-1 md:order-2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-chromatic">
                SURVIVE OR PERISH
              </h2>
              
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-8 md:mb-12 leading-relaxed">
                The clock is ticking. Brands are dying. Will your creativity be the cure, or will you join the marketing undead?
              </p>

              <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg md:text-xl px-10 md:px-12 py-6 md:py-8 rounded-lg transition-all duration-300 hover:scale-105 uppercase tracking-wide w-full md:w-auto"
                style={{ boxShadow: '0 10px 30px hsl(var(--primary) / 0.4)' }}
              >
                REGISTER YOUR TEAM
              </Button>

              <p className="mt-4 md:mt-6 text-xs md:text-sm text-muted-foreground">
                Limited slots available. Register now before extinction!
              </p>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default CTASection;
