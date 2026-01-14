import { Button } from "@/components/ui/button";
import { Sparkles, Camera, MessageSquare, Eye, ArrowRight, Ruler, CheckCircle } from "lucide-react";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  const steps = [
    {
      icon: Camera,
      title: "Upload Photo",
      description: "Share a photo of your window or room",
    },
    {
      icon: MessageSquare,
      title: "Answer Questions",
      description: "Tell us about your preferences",
    },
    {
      icon: Sparkles,
      title: "AI Generated Visualization",
      description: "See blinds rendered in your space",
    },
    {
      icon: Eye,
      title: "View Recommendations",
      description: "Browse personalized suggestions",
    },
    {
      icon: Ruler,
      title: "Measure",
      description: "Get accurate measurements",
    },
    {
      icon: CheckCircle,
      title: "Find Perfect Match",
      description: "Choose your ideal window treatment",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Welcome Message */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">AI-Powered Assistant</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Welcome to AI Blinds Assistant
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Let our AI help you find the perfect window treatments. We'll analyze your space 
            and preferences to create personalized recommendations just for you.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-card rounded-2xl shadow-medium p-5 md:p-6 mb-8 animate-slide-up">
          <h3 className="font-display text-lg font-semibold text-primary mb-5 text-center">
            How It Works
          </h3>
          
          <div className="grid grid-cols-3 gap-x-3 gap-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="relative inline-block mb-2">
                  <div className="w-11 h-11 bg-secondary/15 rounded-full flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                
                <h4 className="font-semibold text-primary text-xs leading-tight mb-0.5">{step.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-tight">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="bg-card rounded-xl p-5 shadow-soft animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <span className="text-green-600 text-lg">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-primary text-sm mb-1">Image Generation with AI</h4>
                <p className="text-xs text-muted-foreground">
                  See how blinds look in your actual room with AI-generated imagery
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-5 shadow-soft animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <span className="text-blue-600 text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-primary text-sm mb-1">Personalized Results</h4>
                <p className="text-xs text-muted-foreground">
                  Get recommendations based on your location, lighting, and style
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-scale-in" style={{ animationDelay: "0.5s" }}>
          <Button
            variant="hero"
            size="xl"
            onClick={onNext}
            className="group w-full md:w-auto"
          >
            Get Started
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            Takes about 2-3 minutes • No account required
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
