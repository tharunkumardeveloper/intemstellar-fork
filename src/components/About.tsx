import { Sparkles, Trophy, Users, Zap } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Creativity Unleashed",
      description: "Explore innovative concepts inspired by the most captivating web series",
    },
    {
      icon: Trophy,
      title: "Compete & Win",
      description: "Showcase your skills and compete for exciting prizes and recognition",
    },
    {
      icon: Users,
      title: "Intercollegiate",
      description: "Connect with talented students from colleges across the region",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Push boundaries and reimagine storytelling through technology and design",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-card/30">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            About <span className="text-primary text-glow">InTEMStellar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            InTEMStellar is an intercollegiate symposium celebrating creativity, storytelling, and innovation inspired by the world of web series. Join us for an unforgettable experience that blends entertainment, technology, and competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card border border-border rounded-xl p-6 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-2">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "4", label: "Epic Events" },
            { number: "500+", label: "Participants" },
            { number: "50+", label: "Colleges" },
            { number: "₹1L+", label: "Prizes" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary text-glow mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
