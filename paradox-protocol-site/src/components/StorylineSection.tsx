import caveEntrance from "@/assets/cave-entrance.webp";

const StorylineSection = () => {
  return (
    <section id="storyline" className="relative py-12 sm:py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Cave entrance image */}
        <div className="mb-8 sm:mb-12 rounded-lg overflow-hidden border border-border">
          <img
            src={caveEntrance}
            alt="The entrance to the paradox"
            className="w-full h-48 sm:h-64 md:h-80 object-cover"
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6 sm:p-8 md:p-12 backdrop-blur-sm animate-fade-in">
          <div className="space-y-4 sm:space-y-6 font-inter text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90">
            <p>
              <span className="text-primary font-semibold animate-glitch inline-block">Time</span> is broken. 
              The town of Winden is trapped inside a chaotic{" "}
              <span className="text-primary font-semibold">time loop</span>, where the past collides with 
              the present and the future fractures into endless possibilities. Systems have failed. Order has collapsed.{" "}
              <span className="text-primary font-semibold animate-glitch inline-block">Reality</span> is 
              on the brink of erasure.
            </p>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-6 sm:my-8" />

            <p>
              The <span className="text-foreground font-semibold">Sic Mundus Council</span> has 
              summoned a new generation of thinkers — innovators capable of bending{" "}
              <span className="text-primary font-semibold">time</span> through creativity, logic, and engineering.
            </p>

            <p className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-center py-4 sm:py-6">
              You are not here to compete.
              <br />
              <span className="text-primary animate-glitch inline-block">
                You are here to rewrite destiny.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorylineSection;
