import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardSliderProps {
  images: string[];
  autoScrollSpeed?: number; // milliseconds per pixel
}

const CardSlider: React.FC<CardSliderProps> = ({ 
  images, 
  autoScrollSpeed = 30 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const animationRef = useRef<number>();

  // Delay scroll start until after fade-in animation completes
  useEffect(() => {
    // Animation completes at 1.2s + 0.7s duration = 1.9s, then add 0.2s delay
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll functionality with smooth animation
  useEffect(() => {
    if (isPaused || !isReady) return;

    const pixelsPerSecond = 1000 / autoScrollSpeed;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setScrollPosition((prev) => {
        const newPosition = prev + (pixelsPerSecond * deltaTime) / 1000;
        
        // Reset for infinite loop (when we've scrolled through one set of images)
        if (scrollContainerRef.current) {
          const singleSetWidth = scrollContainerRef.current.scrollWidth / 3;
          if (newPosition >= singleSetWidth) {
            return 0;
          }
        }
        
        return newPosition;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, autoScrollSpeed, isReady]);

  // Apply scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 400;
    const targetScroll = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground opacity-0"
          style={{ 
            animation: "spectacularFadeInUp 0.7s ease-out 1.0s forwards"
          }}
        >
          Featured Gallery
        </h2>

        <div 
          className="relative group opacity-0"
          style={{ 
            animation: "spectacularFadeInUp 0.7s ease-out 1.2s forwards"
          }}
        >
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'auto',
              willChange: 'scroll-position'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ width: 'auto', height: '220px' }}
              >
                <img
                  src={image}
                  alt={`Gallery image ${(index % images.length) + 1}`}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CardSlider;
