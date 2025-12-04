import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, RotateCcw, Heart, Share2 } from "lucide-react";

interface VisualizerScreenProps {
  onNext: () => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const styleOptions = [
  { id: "cellular", name: "Cellular Shades", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop" },
  { id: "roller", name: "Roller Shades", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop" },
  { id: "wood", name: "Wood Blinds", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
  { id: "sheer", name: "Sheer Shades", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
];

const colorOptions = [
  { id: "white", name: "White", hex: "#F5F5F0" },
  { id: "cream", name: "Cream", hex: "#F5F5DC" },
  { id: "gray", name: "Gray", hex: "#9CA3AF" },
  { id: "brown", name: "Brown", hex: "#8B4513" },
];

const opacityOptions = [
  { id: "blackout", name: "Blackout", value: 100 },
  { id: "room-darkening", name: "Room Darkening", value: 70 },
  { id: "light-filtering", name: "Light Filtering", value: 40 },
  { id: "sheer", name: "Sheer", value: 15 },
];

const VisualizerScreen = ({
  onNext,
  preferences,
  updatePreferences,
}: VisualizerScreenProps) => {
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedOpacity, setSelectedOpacity] = useState(opacityOptions[1]);
  const [liftPosition, setLiftPosition] = useState([50]);
  const [isFavorite, setIsFavorite] = useState(false);

  const roomImage = preferences.photo || "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop";

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Visualize Your Perfect Blinds
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Toggle through different styles, colors, and opacity levels
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Visualizer */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-strong">
              {/* Room Image with Blind Overlay */}
              <div className="relative aspect-[4/3]">
                <img
                  src={roomImage}
                  alt="Your room"
                  className="w-full h-full object-cover"
                />
                
                {/* Simulated Blind Overlay */}
                <div 
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: `linear-gradient(180deg, 
                      ${selectedColor.hex}${Math.round(selectedOpacity.value * 2.55).toString(16).padStart(2, '0')} 0%, 
                      ${selectedColor.hex}${Math.round(selectedOpacity.value * 2.55 * 0.8).toString(16).padStart(2, '0')} ${100 - liftPosition[0]}%, 
                      transparent ${100 - liftPosition[0]}%
                    )`,
                  }}
                />
                
                {/* Horizontal Lines for Blind Effect */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 8px,
                      rgba(0,0,0,0.03) 8px,
                      rgba(0,0,0,0.03) 10px
                    )`,
                    clipPath: `polygon(0 0, 100% 0, 100% ${100 - liftPosition[0]}%, 0 ${100 - liftPosition[0]}%)`,
                  }}
                />

                {/* AI Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-medium">
                  AI Rendered Preview
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="close"
                    size="iconSm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`bg-card/80 backdrop-blur-sm ${isFavorite ? "text-red-500" : ""}`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="close" size="iconSm" className="bg-card/80 backdrop-blur-sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Current Selection Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-medium">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-primary text-sm">{selectedStyle.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {selectedColor.name} • {selectedOpacity.name}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 text-xs">
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lift Control */}
              <div className="p-4 bg-tertiary">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium text-primary whitespace-nowrap">Lift Position</span>
                  <Slider
                    value={liftPosition}
                    onValueChange={setLiftPosition}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-8">{liftPosition[0]}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Style Selection */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {styleOptions.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`
                      p-2 rounded-lg border-2 transition-all text-left
                      ${selectedStyle.id === style.id
                        ? "border-primary bg-secondary/10"
                        : "border-border hover:border-secondary"
                      }
                    `}
                  >
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-12 object-cover rounded mb-1"
                    />
                    <span className="text-xs font-medium text-primary">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Color</h3>
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-12 h-12 rounded-lg border-2 transition-all
                      ${selectedColor.id === color.id
                        ? "border-primary scale-110 shadow-medium"
                        : "border-border hover:scale-105"
                      }
                    `}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Opacity Selection */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Opacity</h3>
              <div className="space-y-2">
                {opacityOptions.map((opacity) => (
                  <button
                    key={opacity.id}
                    onClick={() => setSelectedOpacity(opacity)}
                    className={`
                      w-full p-2 rounded-lg border-2 transition-all flex items-center justify-between
                      ${selectedOpacity.id === opacity.id
                        ? "border-primary bg-secondary/10"
                        : "border-border hover:border-secondary"
                      }
                    `}
                  >
                    <span className="text-xs font-medium text-primary">{opacity.name}</span>
                    <div className="w-16 h-4 rounded bg-gradient-to-r from-transparent to-gray-800" style={{ opacity: opacity.value / 100 }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Motorization Toggle */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Lift Mechanism</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg border-2 border-primary bg-secondary/10 text-center">
                  <span className="text-xs font-medium text-primary">Cordless</span>
                </button>
                <button className="p-3 rounded-lg border-2 border-border hover:border-secondary text-center">
                  <span className="text-xs font-medium text-primary">Motorized</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <Button variant="hero" size="lg" onClick={onNext} className="group w-full md:w-auto">
            View Product Details
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizerScreen;
