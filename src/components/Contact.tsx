import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";
import FadeInSection from "./FadeInSection";

const Contact = () => {
  return (
    <section 
      id="contact" 
      className="py-24 relative overflow-hidden" 
      style={{ 
        scrollMarginTop: '80px',
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up hover:scale-102 transition-transform duration-300 cursor-default">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Have questions? Want to participate? Reach out to us!
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="w-full bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <h3 className="text-2xl font-bold mb-6 text-foreground text-center">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground">intemstellar@tems.edu</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-500">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-muted-foreground">+91 9791382086</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-500">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">TEMS Engineering College, Chennai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-bold mb-4 text-foreground text-center">Follow Us</h3>
            <div className="flex gap-4 justify-center">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-125 hover:rotate-12 active:scale-95"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </button>
              ))}
            </div>
          </div>
        </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
