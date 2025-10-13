import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg shadow-primary/10" : "bg-transparent"
      }`}
    >
      {/* Marquee */}
      <div className="bg-primary/20 border-b border-primary/30 overflow-hidden py-2">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-sm font-semibold text-primary mx-8">NOW STREAMING...</span>
          <span className="text-sm text-muted-foreground mx-8">InTEMStellar 2025</span>
          <span className="text-sm font-semibold text-primary mx-8">NOW STREAMING...</span>
          <span className="text-sm text-muted-foreground mx-8">InTEMStellar 2025</span>
          <span className="text-sm font-semibold text-primary mx-8">NOW STREAMING...</span>
          <span className="text-sm text-muted-foreground mx-8">InTEMStellar 2025</span>
          <span className="text-sm font-semibold text-primary mx-8">NOW STREAMING...</span>
          <span className="text-sm text-muted-foreground mx-8">InTEMStellar 2025</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-2xl md:text-3xl font-bold tracking-tight">
            In<span className="text-primary text-glow">TEMS</span>tellar
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg hover:shadow-primary/50 transition-all">
              Register Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4 animate-fade-in-up">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
              Register Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
