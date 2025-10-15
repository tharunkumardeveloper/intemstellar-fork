import billboard2 from "@/assets/billboard-2.jpg";

const Footer = () => {
  return (
    <footer className="relative py-12 md:py-16 px-4 md:px-6 bg-card border-t-2 border-primary/30">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${billboard2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-chromatic px-4">
          BRAND-O-VATION
        </h3>
        
        <p className="text-lg sm:text-xl md:text-2xl text-primary font-bold mb-3 md:mb-4 px-4">
          The Last Ad-pocalypse
        </p>

        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 px-4">
          Where creativity is the cure to the marketing apocalypse.
        </p>

        <div className="pt-6 md:pt-8 border-t border-border">
          <p className="text-xs md:text-sm text-muted-foreground px-4">
            © 2025 Brand-o-Vation Event. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Go Viral or Go Dead!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
