import { Swords, Users, Flame, Crown, Shield, Gavel } from 'lucide-react';

const rules = [
  {
    icon: Users,
    title: 'Team Up',
    description: 'Form your royal crew — 3 to 4 members per team. Choose allies wisely!',
  },
  {
    icon: Swords,
    title: 'Round 1 – Pitch & Conquer',
    description: 'Present your empire and unveil your global domination plan. 🌍',
  },
  {
    icon: Flame,
    title: 'Round 2 – Crisis Mode',
    description: 'Face sudden corporate chaos — think fast, act smart, lead strong! ⚡',
  },
  {
    icon: Crown,
    title: 'Round 3 – Clash of Titans',
    description: 'Debate your rivals and prove who truly deserves the throne! 🎤',
  },
  {
    icon: Shield,
    title: 'Rule Breakers Beware',
    description: 'No plagiarism, no AI shortcuts — only raw strategy and wit!',
  },
  {
    icon: Gavel,
    title: 'Final Verdict',
    description: "The judges' word is law. Make every move count! ⚖️",
  },
];

const RulesSection = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gold-glow">
            ⚖️ Rules of Engagement
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-display">
            The Code of the Realm
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className="group relative bg-card border-2 border-border hover:border-primary rounded-lg p-6 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--gold-glow)/0.3)] hover:scale-105"
              >
                {/* Corner Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <Icon className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors duration-300 animate-ember-flicker" />
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {rule.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-xl md:text-2xl font-display font-bold text-primary">
            👑 Rule smart, think bold, play fair — the throne awaits! 🔥
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
