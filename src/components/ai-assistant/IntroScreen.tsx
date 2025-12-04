import { Button } from "@/components/ui/button";
import { Sparkles, Camera, MessageSquare, Eye, ArrowRight } from "lucide-react";

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
      title: "AI Analysis",
      description: "Our AI analyzes your space & needs",
    },
    {
      icon: Eye,
      title: "Visualize",
      description: "See blinds in your actual room",
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
        <div className="bg-card rounded-2xl shadow-medium p-6 md:p-8 mb-8 animate-slide-up">
          <h3 className="font-display text-xl font-semibold text-primary mb-6 text-center">
            How It Works
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center p-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-secondary to-secondary/30" />
                )}
                
                {/* Step Number */}
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-3 bg-secondary/20 rounded-full flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                
                <h4 className="font-semibold text-primary text-sm mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.description}</p>
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
                <h4 className="font-semibold text-primary text-sm mb-1">AR Technology</h4>
                <p className="text-xs text-muted-foreground">
                  See how blinds look in your actual room with augmented reality
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
