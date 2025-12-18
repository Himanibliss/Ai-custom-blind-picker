import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, RotateCcw, Heart, Share2, Wand2, Camera, AlertTriangle, ImageOff, Sparkles, RefreshCw } from "lucide-react";
import { generateBlindsVisualization } from "@/services/blindsAIService";
import { toast } from "sonner";

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
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "beige", name: "Beige", hex: "#F5F5DC" },
  { id: "pink", name: "Pink", hex: "#FFC0CB" },
  { id: "orange", name: "Orange", hex: "#FFA500" },
  { id: "red", name: "Red", hex: "#DC2626" },
  { id: "green", name: "Green", hex: "#16A34A" },
  { id: "purple", name: "Purple", hex: "#9333EA" },
  { id: "brown", name: "Brown", hex: "#8B4513" },
  { id: "gold", name: "Gold", hex: "#FFD700" },
  { id: "silver", name: "Silver", hex: "#C0C0C0" },
  { id: "gray", name: "Gray", hex: "#6B7280" },
  { id: "black", name: "Black", hex: "#000000" },
];

const opacityOptions = [
  { id: "blackout", name: "Blackout", value: 95 },
  { id: "room-darkening", name: "Room Darkening", value: 75 },
  { id: "light-filtering", name: "Light Filtering", value: 50 },
  { id: "sheer", name: "Sheer", value: 25 },
];

const loadingMessages = [
  "Analyzing window dimensions...",
  "Mapping room perspective...",
  "Detecting light sources...",
  "Selecting fabric texture...",
  "Rendering realistic textures...",
  "Applying final touches..."
];

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
  
  // AI Generation states
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState<{ message: string; type: string } | null>(null);
  const [viewMode, setViewMode] = useState<'ai' | 'original'>('ai');

  const roomImage = preferences.photo || "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop";

  // Loading animation
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStage((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isLoading]);

  const generateVisualization = useCallback(async () => {
    if (!preferences.photo) {
      toast.info("Using sample room - upload a photo for AI visualization");
      return;
    }

    setIsLoading(true);
    setLoadingStage(0);
    setError(null);

    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const [_, result] = await Promise.all([
        minLoadingTime,
        generateBlindsVisualization(preferences.photo, {
          color: selectedColor.name,
          type: selectedStyle.name,
          opacity: selectedOpacity.value,
          mount: "inside mount"
        })
      ]);

      if (result.error) {
        setError({ message: result.error, type: result.errorType || 'UNKNOWN' });
        toast.error(result.error);
      } else if (result.image) {
        setGeneratedImage(result.image);
        setViewMode('ai');
        toast.success("Visualization generated!");
      }
    } catch (err) {
      console.error("Generation failed:", err);
      setError({ message: "Failed to generate visualization", type: "UNKNOWN" });
      toast.error("Failed to generate visualization");
    } finally {
      setIsLoading(false);
    }
  }, [preferences.photo, selectedColor.name, selectedStyle.name, selectedOpacity.value]);

  // Generate on initial load if photo exists
  useEffect(() => {
    if (preferences.photo && !generatedImage && !isLoading) {
      generateVisualization();
    }
  }, []); // Only run once on mount

  const handleRegenerate = () => {
    generateVisualization();
  };

  const handleReset = () => {
    setSelectedStyle(styleOptions[0]);
    setSelectedColor(colorOptions[0]);
    setSelectedOpacity(opacityOptions[1]);
    setLiftPosition([30]);
    setGeneratedImage(null);
    setError(null);
  };

  const handleColorChange = (color: typeof colorOptions[0]) => {
    setSelectedColor(color);
    // Clear generated image when color changes (user needs to regenerate)
    if (generatedImage) {
      setGeneratedImage(null);
    }
  };

  const handleStyleChange = (style: typeof styleOptions[0]) => {
    setSelectedStyle(style);
    if (generatedImage) {
      setGeneratedImage(null);
    }
  };

  const handleOpacityChange = (opacity: typeof opacityOptions[0]) => {
    setSelectedOpacity(opacity);
    if (generatedImage) {
      setGeneratedImage(null);
    }
  };

  const displayImage = viewMode === 'ai' && generatedImage ? generatedImage : roomImage;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Visualize Your Perfect Blinds
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            AI-powered visualization on your actual window
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Visualizer */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-strong">
              {/* View Toggle */}
              {generatedImage && !isLoading && (
                <div className="absolute top-4 left-4 z-20 bg-card/90 backdrop-blur-sm rounded-lg p-1 flex text-xs font-medium shadow-medium">
                  <button
                    onClick={() => setViewMode('ai')}
                    className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                      viewMode === 'ai' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" /> AI View
                  </button>
                  <button
                    onClick={() => setViewMode('original')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      viewMode === 'original' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary/50'
                    }`}
                  >
                    Original
                  </button>
                </div>
              )}

              {/* Room Image / Generated Image */}
              <div className="relative aspect-[4/3]">
                {isLoading ? (
                  // Loading State
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/10">
                    {preferences.photo && (
                      <div className="absolute inset-0 z-0 opacity-40 blur-md">
                        <img src={roomImage} className="w-full h-full object-cover" alt="Processing" />
                      </div>
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center p-8 rounded-2xl bg-card/95 backdrop-blur-md shadow-strong max-w-sm text-center mx-4">
                      <div className="relative w-20 h-20 mb-4">
                        <div className="absolute inset-0 border-4 border-secondary/30 rounded-full animate-ping" />
                        <div className="absolute inset-0 border-4 border-t-secondary border-r-secondary border-b-transparent border-l-transparent rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Wand2 className="h-7 w-7 text-secondary animate-pulse" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-primary mb-1">Generating Preview</h3>
                      <p className="text-muted-foreground text-sm h-5">{loadingMessages[loadingStage]}</p>
                      
                      <div className="w-40 h-1.5 bg-secondary/20 rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-secondary animate-pulse rounded-full" style={{ width: `${((loadingStage + 1) / loadingMessages.length) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                ) : error ? (
                  // Error State
                  <div className="absolute inset-0 flex items-center justify-center bg-destructive/5">
                    <div className="flex flex-col items-center p-8 rounded-2xl bg-card shadow-strong max-w-sm text-center mx-4">
                      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                        {error.type === 'NO_WINDOW' ? (
                          <ImageOff className="h-8 w-8 text-destructive" />
                        ) : (
                          <AlertTriangle className="h-8 w-8 text-destructive" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2">Oops!</h3>
                      <p className="text-muted-foreground text-sm mb-4">{error.message}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setError(null)}>
                          <Camera className="w-4 h-4 mr-1" /> Try Again
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Image Display
                  <>
                    <img
                      src={displayImage}
                      alt="Your room visualization"
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    
                    {!preferences.photo && (
                      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full shadow-medium text-xs font-medium z-10">
                        Viewing Sample Room
                      </div>
                    )}
                  </>
                )}

                {/* AI Badge */}
                {!isLoading && !error && (
                  <div className="absolute top-4 right-16 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-medium z-10">
                    {generatedImage && viewMode === 'ai' ? 'AI Generated' : 'AI Preview'}
                  </div>
                )}

                {/* Actions */}
                {!isLoading && !error && (
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
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
                )}

                {/* Current Selection Info */}
                {!isLoading && !error && (
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-medium">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                          <div>
                            <h4 className="font-semibold text-primary text-sm">{selectedStyle.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {selectedColor.name} • {selectedOpacity.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1 text-xs">
                            <RotateCcw className="w-3 h-3" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Generate/Regenerate Button */}
              {!isLoading && preferences.photo && (
                <div className="p-4 bg-tertiary border-t border-border">
                  <Button 
                    variant="ai" 
                    className="w-full" 
                    onClick={handleRegenerate}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    {generatedImage ? 'Regenerate with New Selection' : 'Generate AI Preview'}
                  </Button>
                </div>
              )}
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
                    onClick={() => handleStyleChange(style)}
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
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    className={`
                      w-full aspect-square rounded-lg border-2 transition-all flex items-center justify-center
                      ${selectedColor.id === color.id
                        ? "border-primary scale-105 shadow-medium ring-2 ring-secondary/30"
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
                    onClick={() => handleOpacityChange(opacity)}
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

            {/* Info Card */}
            {!generatedImage && preferences.photo && !isLoading && (
              <div className="bg-secondary/20 rounded-xl p-4 border border-secondary/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-primary">Ready to visualize</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Select your preferences and click "Generate AI Preview" to see realistic blinds on your window.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
