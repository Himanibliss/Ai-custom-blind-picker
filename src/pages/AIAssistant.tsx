import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import IntroScreen from "@/components/ai-assistant/IntroScreen";
import PhotoUploadScreen from "@/components/ai-assistant/PhotoUploadScreen";
import QuestionnaireScreen from "@/components/ai-assistant/QuestionnaireScreen";
import VisualizerScreen from "@/components/ai-assistant/VisualizerScreen";
import ProductDetailScreen from "@/components/ai-assistant/ProductDetailScreen";
import MeasurementScreen from "@/components/ai-assistant/MeasurementScreen";
import SummaryScreen from "@/components/ai-assistant/SummaryScreen";
import { Helmet } from "react-helmet-async";

export type AIAssistantStep = 
  | "intro"
  | "photo-upload"
  | "questionnaire"
  | "visualizer"
  | "product-detail"
  | "measurement"
  | "summary";

export interface UserPreferences {
  photo: string | null;
  sunlightPreference: string;
  blindType: string;
  colorChoice: string;
  mountType: string;
  motorized: boolean;
  childSafety: boolean;
  budget: string;
}

const AIAssistant = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<AIAssistantStep>("intro");
  const [preferences, setPreferences] = useState<UserPreferences>({
    photo: null,
    sunlightPreference: "",
    blindType: "",
    colorChoice: "",
    mountType: "",
    motorized: false,
    childSafety: false,
    budget: "",
  });

  const stepOrder: AIAssistantStep[] = [
    "intro",
    "photo-upload",
    "questionnaire",
    "visualizer",
    "product-detail",
    "measurement",
    "summary",
  ];

  const currentStepIndex = stepOrder.indexOf(currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < stepOrder.length) {
      setCurrentStep(stepOrder[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(stepOrder[prevIndex]);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroScreen onNext={handleNext} />;
      case "photo-upload":
        return (
          <PhotoUploadScreen
            onNext={handleNext}
            onSkip={handleNext}
            preferences={preferences}
            updatePreferences={updatePreferences}
          />
        );
      case "questionnaire":
        return (
          <QuestionnaireScreen
            onNext={handleNext}
            preferences={preferences}
            updatePreferences={updatePreferences}
          />
        );
      case "visualizer":
        return (
          <VisualizerScreen
            onNext={handleNext}
            preferences={preferences}
            updatePreferences={updatePreferences}
          />
        );
      case "product-detail":
        return (
          <ProductDetailScreen
            onNext={handleNext}
            preferences={preferences}
          />
        );
      case "measurement":
        return (
          <MeasurementScreen
            onNext={handleNext}
            preferences={preferences}
          />
        );
      case "summary":
        return (
          <SummaryScreen
            preferences={preferences}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Blinds Assistant | SelectBlinds</title>
        <meta name="description" content="Use our AI assistant to find the perfect blinds for your home. Upload a photo and get personalized recommendations." />
      </Helmet>
      
      <div className="min-h-screen bg-tertiary flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-card shadow-soft">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              {currentStep !== "intro" ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-primary hover:bg-secondary/10"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              ) : (
                <div className="w-10" />
              )}

              {/* Title */}
              <div className="text-center">
                <h1 className="font-display text-lg md:text-xl font-bold text-primary">
                  AI Blinds Assistant
                </h1>
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-1 mt-2">
                  {stepOrder.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        i <= currentStepIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-primary hover:bg-secondary/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          {renderStep()}
        </main>
      </div>
    </>
  );
};

export default AIAssistant;
