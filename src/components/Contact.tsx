import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will go here
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up hover:scale-105 transition-transform duration-500 cursor-default">
            Get In <span className="text-primary text-glow animate-pulse-slow">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up hover:text-foreground transition-colors duration-500" style={{ animationDelay: "0.2s" }}>
            Have questions? Want to participate? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="bg-card border-border focus:border-primary transition-all duration-500 hover:border-primary/50 focus:scale-105"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-card border-border focus:border-primary transition-all duration-500 hover:border-primary/50 focus:scale-105"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Your Phone"
                  className="bg-card border-border focus:border-primary transition-all duration-500 hover:border-primary/50 focus:scale-105"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  required
                  rows={6}
                  className="bg-card border-border focus:border-primary transition-all duration-500 resize-none hover:border-primary/50 focus:scale-105"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-primary/50 transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 duration-500"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="bg-card border border-border rounded-xl p-6 transition-all duration-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-105">
              <h3 className="text-2xl font-bold mb-6 text-foreground hover:text-primary hover:text-glow transition-all duration-500">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-500">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <Mail className="w-5 h-5 text-primary group-hover:animate-pulse-slow" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-500">Email</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">intemstellar@tems.edu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-500">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <Phone className="w-5 h-5 text-primary group-hover:animate-pulse-slow" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-500">Phone</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">+91 9791382086</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-500">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    <MapPin className="w-5 h-5 text-primary group-hover:animate-pulse-slow" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-500">Location</p>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">TEMS Engineering College, Chennai</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-xl p-6 transition-all duration-700 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-105">
              <h3 className="text-xl font-bold mb-4 text-foreground hover:text-primary hover:text-glow transition-all duration-500">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "Twitter" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-500 group hover:scale-125 hover:rotate-12 active:scale-95"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors group-hover:animate-pulse-slow" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
