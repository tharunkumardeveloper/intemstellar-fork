const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-primary/20 overflow-hidden">
      {/* Animated Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            In<span className="text-primary text-glow">TEMS</span>tellar
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground">
            © 2025 InTEMStellar | Powered by{" "}
            <span className="text-primary font-semibold">TEMS Symposium</span>
          </p>

          {/* Quick Links */}
          <div className="flex justify-center gap-6 flex-wrap">
            {["Home", "About", "Events", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
