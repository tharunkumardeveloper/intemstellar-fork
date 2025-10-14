const Footer = () => {
  return (
    <footer className="relative py-3 border-t border-primary/20 overflow-hidden">
      {/* Animated Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          {/* Logo and Copyright combined */}
          <div className="flex items-center gap-2">
            <span className="font-bold">
              In<span className="text-primary">TEMS</span>tellar
            </span>
            <span className="text-muted-foreground">
              © 2025
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-3">
            {["Home", "About", "Events", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-muted-foreground"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
