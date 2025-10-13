import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Events />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
