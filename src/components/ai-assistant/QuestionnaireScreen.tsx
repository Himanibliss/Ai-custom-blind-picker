import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Sun, Moon, Check, ArrowRight } from "lucide-react";

interface QuestionnaireScreenProps {
  onNext: () => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

interface Question {
  id: keyof UserPreferences;
  question: string;
  options: { value: string; label: string; icon?: React.ReactNode; color?: string }[];
  type: "single" | "boolean";
}

const questions: Question[] = [
  {
    id: "sunlightPreference",
    question: "Would you like to block sunlight or is more sunlight the better?",
    type: "single",
    options: [
      { value: "block", label: "Block Sunlight", icon: <Moon className="w-5 h-5" /> },
      { value: "filter", label: "Filter Sunlight", icon: <Sun className="w-5 h-5 opacity-60" /> },
      { value: "maximize", label: "Maximize Sunlight", icon: <Sun className="w-5 h-5" /> },
    ],
  },
  {
    id: "blindType",
    question: "What type of Shades/Blinds/Curtains do you prefer?",
    type: "single",
    options: [
      { value: "blinds", label: "Blinds" },
      { value: "shades", label: "Shades" },
      { value: "shutters", label: "Shutters" },
      { value: "curtains", label: "Curtains & Drapes" },
    ],
  },
  {
    id: "colorChoice",
    question: "Any color choice preference?",
    type: "single",
    options: [
      { value: "white", label: "White", color: "#FFFFFF" },
      { value: "beige", label: "Beige", color: "#D4B896" },
      { value: "pink", label: "Pink", color: "#F4A5B8" },
      { value: "orange", label: "Orange", color: "#F97316" },
      { value: "red", label: "Red", color: "#DC2626" },
      { value: "green", label: "Green", color: "#22C55E" },
      { value: "purple", label: "Purple", color: "#9333EA" },
      { value: "brown", label: "Brown", color: "#8B4513" },
      { value: "gold", label: "Gold", color: "#D4AF37" },
      { value: "silver", label: "Silver", color: "#C0C0C0" },
      { value: "gray", label: "Gray", color: "#6B7280" },
      { value: "black", label: "Black", color: "#1F2937" },
    ],
  },
  {
    id: "mountType",
    question: "What type of mount do you prefer?",
    type: "single",
    options: [
      { value: "inside", label: "Inside Mount" },
      { value: "outside", label: "Outside Mount" },
    ],
  },
  {
    id: "motorized",
    question: "Would you like motorized operation?",
    type: "boolean",
    options: [
      { value: "true", label: "Yes, Motorized" },
      { value: "false", label: "No, Manual/Cordless" },
    ],
  },
  {
    id: "childSafety",
    question: "Do you need child safety (cordless) options?",
    type: "boolean",
    options: [
      { value: "true", label: "Yes, Child Safety" },
      { value: "false", label: "No, Not Required" },
    ],
  },
  {
    id: "budget",
    question: "Approximately how much would you be open to spend?",
    type: "single",
    options: [
      { value: "200-400", label: "$200 - $400" },
      { value: "650-850", label: "$650 - $850" },
      { value: "850-1100", label: "$850 - $1,100" },
      { value: "1100-1500", label: "$1,100 - $1,500+" },
    ],
  },
];

const QuestionnaireScreen = ({
  onNext,
  preferences,
  updatePreferences,
}: QuestionnaireScreenProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const getCurrentValue = () => {
    const value = preferences[currentQuestion.id];
    if (typeof value === "boolean") {
      return value.toString();
    }
    return value as string;
  };

  const handleSelect = (value: string) => {
    const update: Partial<UserPreferences> = {};
    
    if (currentQuestion.type === "boolean") {
      update[currentQuestion.id as "motorized" | "childSafety"] = value === "true";
    } else {
      (update as Record<string, string>)[currentQuestion.id] = value;
    }
    
    updatePreferences(update);

    // Auto-advance after short delay
    setTimeout(() => {
      if (!isLastQuestion) {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onNext();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const canProceed = getCurrentValue() !== "" && getCurrentValue() !== undefined;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="animate-fade-in" key={currentQuestionIndex}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          {currentQuestion.id === "colorChoice" ? (
            // Grid layout for color options
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = getCurrentValue() === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-300
                      flex flex-col items-center gap-2
                      ${isSelected
                        ? "border-primary bg-secondary/20 shadow-medium scale-[1.02]"
                        : "border-border bg-card hover:border-secondary hover:bg-secondary/5"
                      }
                    `}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg border flex-shrink-0 ${
                        option.value === "white" ? "border-gray-300" : "border-transparent"
                      }`}
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="text-sm font-medium text-primary">{option.label}</span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            // Standard list layout for other options
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = getCurrentValue() === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-300
                      flex items-center gap-4 text-left
                      ${isSelected
                        ? "border-primary bg-secondary/20 shadow-medium scale-[1.02]"
                        : "border-border bg-card hover:border-secondary hover:bg-secondary/5"
                      }
                    `}
                  >
                    {/* Icon */}
                    {option.icon && (
                      <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 text-primary">
                        {option.icon}
                      </div>
                    )}
                    
                    {/* Label */}
                    <span className="flex-1 font-medium text-primary">{option.label}</span>
                    
                    {/* Check */}
                    <div
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center
                        transition-all duration-300
                        ${isSelected
                          ? "border-primary bg-primary"
                          : "border-border"
                        }
                      `}
                    >
                      {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${i === currentQuestionIndex
                    ? "w-6 bg-primary"
                    : i < currentQuestionIndex
                    ? "bg-secondary"
                    : "bg-border"
                  }
                `}
              />
            ))}
          </div>

          {/* Next Button */}
          {(isLastQuestion || canProceed) && (
            <Button
              variant="hero"
              size="lg"
              onClick={handleNext}
              disabled={!canProceed}
              className="w-full group"
            >
              {isLastQuestion ? "See My Recommendations" : "Next Question"}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireScreen;
