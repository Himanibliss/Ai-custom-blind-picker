import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-secondary/20 to-tertiary">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center text-center">
          {/* Decorative measuring tape pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 -left-20 w-96 h-8 bg-amber-400 rotate-45" />
            <div className="absolute top-20 -right-20 w-96 h-8 bg-amber-400 -rotate-45" />
            <div className="absolute bottom-10 left-1/4 w-72 h-8 bg-amber-400 rotate-12" />
          </div>

          {/* Sale Badge */}
          <div className="relative z-10 mb-6">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-soft">
              Cyber Monday Sale
            </span>
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-primary mb-4 animate-slide-up">
              <span className="block text-secondary">60%</span>
              <span className="block text-3xl md:text-5xl mt-2">Up to Off Sitewide</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Cyber Monday Sale Ends Today!
            </p>
            <Button 
              variant="heroLight" 
              size="xl"
              className="animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              Shop Now
            </Button>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
            <Button variant="outline" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
            <Button variant="outline" size="icon" className="rounded-full bg-card/80 backdrop-blur-sm">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all ${
              i === 0 ? "w-8 bg-primary" : "w-4 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
