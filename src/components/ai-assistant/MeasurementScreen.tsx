import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { ArrowRight, Ruler, HelpCircle, Camera, Check } from "lucide-react";

interface MeasurementScreenProps {
  onNext: () => void;
  preferences: UserPreferences;
}

const MeasurementScreen = ({ onNext, preferences }: MeasurementScreenProps) => {
  const [width, setWidth] = useState({ inches: "", fraction: "0" });
  const [height, setHeight] = useState({ inches: "", fraction: "0" });
  const [mountType, setMountType] = useState<"inside" | "outside">("inside");

  const fractionOptions = [
    { value: "0", label: "0" },
    { value: "1/8", label: "1/8" },
    { value: "1/4", label: "1/4" },
    { value: "3/8", label: "3/8" },
    { value: "1/2", label: "1/2" },
    { value: "5/8", label: "5/8" },
    { value: "3/4", label: "3/4" },
    { value: "7/8", label: "7/8" },
  ];

  const isValid = width.inches && height.inches;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full mb-4">
            <Ruler className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Measurement Assistant</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Enter Your Window Measurements
          </h2>
          <p className="text-muted-foreground text-sm">
            Accurate measurements ensure a perfect fit. Use our guide below.
          </p>
        </div>

        {/* Mount Type Selection */}
        <div className="bg-card rounded-xl p-5 shadow-soft mb-6 animate-slide-up">
          <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
            Mount Type
            <button className="text-muted-foreground hover:text-primary">
              <HelpCircle className="w-4 h-4" />
            </button>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMountType("inside")}
              className={`
                p-4 rounded-xl border-2 transition-all text-center
                ${mountType === "inside"
                  ? "border-primary bg-secondary/10"
                  : "border-border hover:border-secondary"
                }
              `}
            >
              <div className="w-full h-20 bg-tertiary rounded-lg mb-3 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary rounded relative">
                  <div className="absolute inset-1 bg-secondary/30 rounded-sm" />
                </div>
              </div>
              <span className="font-medium text-primary text-sm">Inside Mount</span>
              <p className="text-xs text-muted-foreground mt-1">Fits inside window frame</p>
            </button>
            <button
              onClick={() => setMountType("outside")}
              className={`
                p-4 rounded-xl border-2 transition-all text-center
                ${mountType === "outside"
                  ? "border-primary bg-secondary/10"
                  : "border-border hover:border-secondary"
                }
              `}
            >
              <div className="w-full h-20 bg-tertiary rounded-lg mb-3 flex items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 border-2 border-muted-foreground rounded" />
                  <div className="absolute -inset-2 border-4 border-primary rounded bg-secondary/30" />
                </div>
              </div>
              <span className="font-medium text-primary text-sm">Outside Mount</span>
              <p className="text-xs text-muted-foreground mt-1">Mounted on wall or frame</p>
            </button>
          </div>
        </div>

        {/* Measurement Inputs */}
        <div className="bg-card rounded-xl p-5 shadow-soft mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="font-semibold text-primary mb-4">Window Dimensions</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Width */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Width</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Inches"
                    value={width.inches}
                    onChange={(e) => setWidth({ ...width, inches: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <span className="text-xs text-muted-foreground mt-1 block text-center">inches</span>
                </div>
                <div className="w-24">
                  <select
                    value={width.fraction}
                    onChange={(e) => setWidth({ ...width, fraction: e.target.value })}
                    className="w-full h-12 px-3 rounded-lg border border-input bg-background text-center focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {fractionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="text-xs text-muted-foreground mt-1 block text-center">fraction</span>
                </div>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Height</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Inches"
                    value={height.inches}
                    onChange={(e) => setHeight({ ...height, inches: e.target.value })}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <span className="text-xs text-muted-foreground mt-1 block text-center">inches</span>
                </div>
                <div className="w-24">
                  <select
                    value={height.fraction}
                    onChange={(e) => setHeight({ ...height, fraction: e.target.value })}
                    className="w-full h-12 px-3 rounded-lg border border-input bg-background text-center focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    {fractionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <span className="text-xs text-muted-foreground mt-1 block text-center">fraction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AR Measurement Option */}
        <div className="bg-secondary/10 rounded-xl p-5 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-card rounded-lg shadow-soft flex-shrink-0">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-primary mb-1">Use AR Measurement</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Point your camera at the window and let our AR technology measure automatically
              </p>
              <Button variant="peachOutline" size="sm">
                Open AR Measure Tool
              </Button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-xl p-5 shadow-soft mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h4 className="font-semibold text-primary mb-3">Measurement Tips</h4>
          <ul className="space-y-2">
            {[
              "Measure in 3 places and use the smallest measurement",
              "For inside mount, measure the exact window opening",
              "For outside mount, add 2-3 inches on each side for coverage",
              "Use a metal tape measure for accuracy",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <Button
            variant="hero"
            size="lg"
            onClick={onNext}
            disabled={!isValid}
            className="w-full group"
          >
            View Summary & Recommendations
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          {!isValid && (
            <p className="text-xs text-muted-foreground text-center mt-3">
              Please enter both width and height to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementScreen;
