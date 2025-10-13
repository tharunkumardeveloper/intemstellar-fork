import EventCard from "./EventCard";
import brandoVationImg from "@/assets/brand-o-vation.jpg";
import paradoxProtocolImg from "@/assets/paradox-protocol.jpg";
import venturaImg from "@/assets/ventura.jpg";
import capitalyzeImg from "@/assets/capitalyze.jpg";

const Events = () => {
  const events = [
    {
      title: "Brand-o-Vation",
      subtitle: "The Last Ad-pocalypse",
      theme: "All of Us Are Dead",
      tagline: "Go Viral or Go Dead 🧟‍♂️",
      coordinators: [
        { name: "Lalith J", phone: "9791382086", year: "2nd Year" },
        { name: "Kamalika N M", phone: "9042887720", year: "2nd Year" },
        { name: "Akshitha Jyothi D", phone: "6382982045", year: "3rd Year" },
      ],
      image: brandoVationImg,
      accentColor: "hsl(0 80% 50%)",
    },
    {
      title: "The Paradox Protocol",
      subtitle: "",
      theme: "Dark",
      tagline: "Reimagine. Rebuild. Redefine Reality.",
      coordinators: [
        { name: "Varshini", phone: "8667801807", year: "2nd Year" },
        { name: "Harsha Nandhini", phone: "9840335963", year: "2nd Year" },
        { name: "Surya", phone: "7904461620", year: "3rd Year" },
      ],
      image: paradoxProtocolImg,
      accentColor: "hsl(45 100% 55%)",
    },
    {
      title: "Ventura",
      subtitle: "",
      theme: "Squid Game",
      tagline: "Play. Survive. Conquer.",
      coordinators: [
        { name: "Sanjay V", phone: "8610315770", year: "2nd Year" },
        { name: "Vetrichelva RS", phone: "9344016363", year: "2nd Year" },
        { name: "Shaheen", phone: "+91 78455 88146", year: "3rd Year" },
      ],
      image: venturaImg,
      accentColor: "hsl(330 100% 65%)",
    },
    {
      title: "Capitalyze",
      subtitle: "",
      theme: "Game of Thrones",
      tagline: "Strategize the Business, Seize the Throne.",
      coordinators: [
        { name: "Manodharani", phone: "8438616965", year: "2nd Year" },
        { name: "Bhagavadgitan", phone: "9047900060", year: "2nd Year" },
        { name: "Keerthana", phone: "9047563090", year: "3rd Year" },
      ],
      image: capitalyzeImg,
      accentColor: "hsl(210 80% 50%)",
    },
  ];

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
            Featured <span className="text-primary text-glow">Events</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Four epic events inspired by the most captivating web series
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={event.title}
              title={event.title}
              theme={event.theme}
              tagline={event.tagline}
              coordinators={event.coordinators}
              image={event.image}
              accentColor={event.accentColor}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
