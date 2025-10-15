import { Phone, Crown } from 'lucide-react';

const coordinators = [
  {
    name: 'Manodharani',
    phone: '8438616965',
    title: 'Strategic Advisor',
  },
  {
    name: 'Bhagavadgitan',
    phone: '9047900060',
    title: 'Master of Innovation',
  },
  {
    name: 'Keerthana',
    phone: '9047563090',
    title: 'Lord Commander',
  },
];

const CoordinatorsSection = () => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Crown className="w-12 h-12 mx-auto mb-4 text-primary animate-glow-pulse" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-gold-glow">
            💠 The Small Council
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-display">
            The Lords and Ladies of CAPITALYZE
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coordinators.map((coordinator, index) => (
            <div
              key={index}
              className="group relative bg-card border-2 border-border hover:border-primary rounded-lg p-8 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--gold-glow)/0.4)] hover:scale-105"
            >
              {/* Banner Effect */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative text-center">
                {/* Crown Icon for Hover */}
                <Crown className="w-10 h-10 mx-auto mb-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ember-flicker" />
                
                <h3 className="text-xl font-display font-bold mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                  {coordinator.name}
                </h3>
                
                <div className="inline-block bg-muted rounded-lg px-4 py-2 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-foreground font-semibold">
                      {coordinator.phone}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm font-display text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {coordinator.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoordinatorsSection;
