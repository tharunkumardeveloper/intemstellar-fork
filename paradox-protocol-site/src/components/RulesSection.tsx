import { Shield } from "lucide-react";

const rules = [
  "Teams of 3–4 members",
  "Cross-department participation allowed",
  "All offline rounds are non-eliminative",
  "AI tools allowed only when specified",
  "Strict time adherence required",
  "Evaluation: originality, creativity, feasibility, teamwork",
  "Council decisions are final",
  "Any tech stack can be used",
];

const RulesSection = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 bg-muted/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-primary" />
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            THE COUNCIL'S CODE
          </h2>
          <p className="font-inter text-sm sm:text-base text-muted-foreground">
            Laws that govern the paradox
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="bg-card border border-border hover:border-primary/50 rounded-lg p-4 sm:p-6 transition-all duration-300 animate-fade-in group cursor-default"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center font-orbitron text-xs sm:text-sm text-primary transition-all">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="font-inter text-sm sm:text-base text-foreground/90 leading-relaxed pt-1">
                  {rule}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Binary divider */}
        <div className="mt-8 sm:mt-12 text-center font-mono text-xs text-muted-foreground/30 tracking-widest overflow-x-auto">
          <span className="inline-block">01010100 01001001 01001101 01000101</span>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
