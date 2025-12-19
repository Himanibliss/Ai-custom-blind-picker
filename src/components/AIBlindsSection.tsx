import { Button } from "@/components/ui/button";
import { Sparkles, Camera, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aiBlindsHero from "@/assets/ai-blinds-hero.jpg";

const AIBlindsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-tertiary to-peach-light" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 animate-slide-up">
              Find Perfect Blinds with AI
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Want to see how those blinds would look on your window? We'll show you the best option tailored to your home needs. We'll ask some questions to understand your choice.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-xl shadow-soft">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Upload Your Room Photo</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-xl shadow-soft">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Get Personalized Results</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/ai-assistant")}
              className="group animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              See My Options
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-[11px] text-muted-foreground mt-3 max-w-md mx-auto lg:mx-0">
              AI helps you explore options but always review and consult a human design expert before deciding.
            </p>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative bg-card rounded-3xl shadow-strong overflow-hidden">
                <img
                  src={aiBlindsHero}
                  alt="Beautiful room with custom blinds"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />
                
                {/* AI Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                
                {/* Floating Cards */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <div className="flex-1 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-medium animate-float">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-xs font-semibold text-primary">AI Analyzing...</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Room dimensions detected</p>
                  </div>
                  <div className="flex-1 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-medium animate-float" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3 h-3 text-secondary" />
                      <span className="text-xs font-semibold text-primary">Style Match</span>
                    </div>
                    <p className="text-xs text-muted-foreground">3 perfect options found</p>
                  </div>
                </div>
              </div>

              {/* Decorative Ring */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border-2 border-secondary/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBlindsSection;
