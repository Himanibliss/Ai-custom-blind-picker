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
  { id: "blinds", name: "Blinds", type: "blinds" },
  { id: "shades", name: "Shades", type: "shades" },
  { id: "shutters", name: "Shutters", type: "shutters" },
  { id: "drapes", name: "Drapes", type: "drapes" },
];

const colorOptions = [
  { id: "white", name: "White", hex: "#F5F5F0" },
  { id: "cream", name: "Cream", hex: "#F5F5DC" },
  { id: "gray", name: "Gray", hex: "#9CA3AF" },
  { id: "brown", name: "Brown", hex: "#8B4513" },
  { id: "navy", name: "Navy", hex: "#1e3a5f" },
  { id: "charcoal", name: "Charcoal", hex: "#36454F" },
];

const opacityOptions = [
  { id: "blackout", name: "Blackout", value: 95 },
  { id: "room-darkening", name: "Room Darkening", value: 75 },
  { id: "light-filtering", name: "Light Filtering", value: 50 },
  { id: "sheer", name: "Sheer", value: 25 },
];

// SVG Pattern Components for realistic blind rendering
const BlindPattern = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="blinds-pattern" patternUnits="userSpaceOnUse" width="100%" height="24">
        <rect width="100%" height="20" fill={color} fillOpacity={opacity / 100} />
        <rect y="20" width="100%" height="4" fill="rgba(0,0,0,0.15)" />
        <line x1="0" y1="1" x2="100%" y2="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <line x1="0" y1="19" x2="100%" y2="19" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
      </pattern>
      <linearGradient id="blind-depth" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="50%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#blinds-pattern)" />
    <rect width="100%" height="100%" fill="url(#blind-depth)" />
  </svg>
);

const ShadePattern = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cellular-pattern" patternUnits="userSpaceOnUse" width="60" height="30">
        <rect width="60" height="30" fill={color} fillOpacity={opacity / 100} />
        <ellipse cx="30" cy="15" rx="28" ry="12" fill="rgba(0,0,0,0.08)" />
        <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
      </pattern>
      <linearGradient id="shade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#cellular-pattern)" />
    <rect width="100%" height="100%" fill="url(#shade-gradient)" />
  </svg>
);

const ShutterPattern = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="shutter-pattern" patternUnits="userSpaceOnUse" width="100%" height="40">
        <rect width="100%" height="35" fill={color} fillOpacity={opacity / 100} />
        <rect y="35" width="100%" height="5" fill="rgba(0,0,0,0.3)" />
        <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <line x1="0" y1="33" x2="100%" y2="33" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
        {/* Tilt angle effect */}
        <rect y="8" width="100%" height="20" fill="rgba(0,0,0,0.05)" 
          transform="skewY(-2)" />
      </pattern>
      <linearGradient id="shutter-frame" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color} stopOpacity="1" />
        <stop offset="2%" stopColor="rgba(0,0,0,0.3)" />
        <stop offset="4%" stopColor={color} stopOpacity="0.9" />
        <stop offset="96%" stopColor={color} stopOpacity="0.9" />
        <stop offset="98%" stopColor="rgba(0,0,0,0.3)" />
        <stop offset="100%" stopColor={color} stopOpacity="1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#shutter-pattern)" />
    {/* Left frame */}
    <rect x="0" y="0" width="4%" height="100%" fill={color} fillOpacity={opacity / 100 + 0.1} />
    <rect x="0" y="0" width="1%" height="100%" fill="rgba(255,255,255,0.3)" />
    {/* Right frame */}
    <rect x="96%" y="0" width="4%" height="100%" fill={color} fillOpacity={opacity / 100 + 0.1} />
    <rect x="99%" y="0" width="1%" height="100%" fill="rgba(0,0,0,0.2)" />
    {/* Center divider */}
    <rect x="48%" y="0" width="4%" height="100%" fill={color} fillOpacity={opacity / 100 + 0.1} />
  </svg>
);

const DrapePattern = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="drape-texture" patternUnits="userSpaceOnUse" width="40" height="40">
        <rect width="40" height="40" fill={color} fillOpacity={opacity / 100} />
        {/* Fabric weave texture */}
        <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
        <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </pattern>
      <linearGradient id="drape-folds" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.25)" />
        <stop offset="10%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="20%" stopColor="rgba(0,0,0,0.15)" />
        <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="40%" stopColor="rgba(0,0,0,0.2)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="60%" stopColor="rgba(0,0,0,0.15)" />
        <stop offset="70%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="80%" stopColor="rgba(0,0,0,0.2)" />
        <stop offset="90%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
      </linearGradient>
      <linearGradient id="drape-hang" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
        <stop offset="5%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#drape-texture)" />
    <rect width="100%" height="100%" fill="url(#drape-folds)" />
    <rect width="100%" height="100%" fill="url(#drape-hang)" />
    {/* Top rod/valance */}
    <rect x="0" y="0" width="100%" height="3%" fill={color} fillOpacity="1" />
    <rect x="0" y="0" width="100%" height="1.5%" fill="rgba(255,255,255,0.3)" />
  </svg>
);

const VisualizerScreen = ({
  onNext,
  preferences,
  updatePreferences,
}: VisualizerScreenProps) => {
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedOpacity, setSelectedOpacity] = useState(opacityOptions[1]);
  const [liftPosition, setLiftPosition] = useState([30]);
  const [isFavorite, setIsFavorite] = useState(false);

  const roomImage = preferences.photo || "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop";

  const renderBlindOverlay = () => {
    const coverageHeight = 100 - liftPosition[0];
    
    return (
      <div 
        className="absolute transition-all duration-300 ease-out"
        style={{
          // Position the blind overlay on the window area (centered, typical window position)
          top: '8%',
          left: '15%',
          right: '15%',
          height: `${coverageHeight * 0.7}%`,
          maxHeight: '75%',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.1)',
        }}
      >
        {selectedStyle.type === 'blinds' && (
          <BlindPattern color={selectedColor.hex} opacity={selectedOpacity.value} />
        )}
        {selectedStyle.type === 'shades' && (
          <ShadePattern color={selectedColor.hex} opacity={selectedOpacity.value} />
        )}
        {selectedStyle.type === 'shutters' && (
          <ShutterPattern color={selectedColor.hex} opacity={selectedOpacity.value} />
        )}
        {selectedStyle.type === 'drapes' && (
          <DrapePattern color={selectedColor.hex} opacity={selectedOpacity.value} />
        )}
        
        {/* Bottom rail/bar */}
        {selectedStyle.type !== 'drapes' && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-3"
            style={{ 
              backgroundColor: selectedColor.hex,
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          />
        )}
      </div>
    );
  };

  const handleReset = () => {
    setSelectedStyle(styleOptions[0]);
    setSelectedColor(colorOptions[0]);
    setSelectedOpacity(opacityOptions[1]);
    setLiftPosition([30]);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Visualize Your Perfect Blinds
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            See how different styles look on your window
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
                
                {/* Realistic Blind Overlay */}
                {renderBlindOverlay()}

                {/* AI Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-medium">
                  AI Preview
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
                      <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-xs">
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
                    max={90}
                    min={0}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-muted-foreground w-12">{100 - liftPosition[0]}% down</span>
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
                      p-3 rounded-lg border-2 transition-all text-center
                      ${selectedStyle.id === style.id
                        ? "border-primary bg-secondary/20"
                        : "border-border hover:border-secondary"
                      }
                    `}
                  >
                    <span className="text-sm font-medium text-primary">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center
                      ${selectedColor.id === color.id
                        ? "border-primary scale-105 shadow-medium"
                        : "border-border hover:scale-105"
                      }
                    `}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.id === color.id && (
                      <div className="w-3 h-3 rounded-full bg-primary border-2 border-white" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">{selectedColor.name}</p>
            </div>

            {/* Opacity Selection */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Light Control</h3>
              <div className="space-y-2">
                {opacityOptions.map((opacity) => (
                  <button
                    key={opacity.id}
                    onClick={() => setSelectedOpacity(opacity)}
                    className={`
                      w-full p-2.5 rounded-lg border-2 transition-all flex items-center justify-between
                      ${selectedOpacity.id === opacity.id
                        ? "border-primary bg-secondary/20"
                        : "border-border hover:border-secondary"
                      }
                    `}
                  >
                    <span className="text-xs font-medium text-primary">{opacity.name}</span>
                    <div 
                      className="w-16 h-4 rounded border border-border"
                      style={{ 
                        background: `linear-gradient(to right, transparent, ${selectedColor.hex})`,
                        opacity: opacity.value / 100 
                      }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Lift Mechanism */}
            <div className="bg-card rounded-xl p-4 shadow-soft">
              <h3 className="font-semibold text-primary text-sm mb-3">Lift Mechanism</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 rounded-lg border-2 border-primary bg-secondary/20 text-center">
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
