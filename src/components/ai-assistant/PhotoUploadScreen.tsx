import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Camera, Upload, Image as ImageIcon, X, Sparkles, MapPin } from "lucide-react";

interface PhotoUploadScreenProps {
  onNext: () => void;
  onSkip: () => void;
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const PhotoUploadScreen = ({
  onNext,
  onSkip,
  preferences,
  updatePreferences,
}: PhotoUploadScreenProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatePreferences({ photo: e.target?.result as string });
        // Simulate AI analysis
        setIsAnalyzing(true);
        setTimeout(() => setIsAnalyzing(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearPhoto = () => {
    updatePreferences({ photo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
            Upload Your Room Photo
          </h2>
          <p className="text-muted-foreground">
            Share a photo of your window or room for AI-powered visualization. Our technology 
            will analyze the space and show you how different blinds will look.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8 animate-slide-up">
          {!preferences.photo ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center
                transition-all duration-300 cursor-pointer
                ${isDragging
                  ? "border-primary bg-secondary/10 scale-[1.02]"
                  : "border-border hover:border-secondary hover:bg-secondary/5"
                }
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
              
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="font-semibold text-primary mb-2">
                  Drag & drop your photo here
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse from your device
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="peachOutline" size="sm" className="gap-2">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </Button>
                  <Button variant="peachOutline" size="sm" className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden shadow-medium">
              <img
                src={preferences.photo}
                alt="Uploaded room"
                className="w-full h-64 md:h-80 object-cover"
              />
              
              {/* AI Analysis Overlay */}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                  <div className="text-center text-primary-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <p className="font-semibold">AI Analyzing Your Space...</p>
                    <p className="text-sm opacity-80">Detecting dimensions & lighting</p>
                  </div>
                </div>
              )}
              
              {/* Analysis Results */}
              {!isAnalyzing && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-500/80 rounded-full text-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>Room Detected</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-primary-foreground/20 rounded-full text-sm">
                      <MapPin className="w-3 h-3" />
                      <span>Window Located</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Clear Button */}
              <Button
                variant="close"
                size="icon"
                onClick={clearPhoto}
                className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-card rounded-xl p-5 mb-8 shadow-soft animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h4 className="font-semibold text-primary mb-3">Tips for Best Results</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Include the full window in frame
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Good natural lighting helps
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Show some wall space around window
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              Avoid extreme angles
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          {preferences.photo && !isAnalyzing ? (
            <Button variant="hero" size="lg" onClick={onNext} className="flex-1">
              Next
            </Button>
          ) : (
            <Button variant="heroLight" size="lg" onClick={onSkip} className="flex-1">
              Skip for Now
            </Button>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          You can always add a photo later to visualize your selections
        </p>
      </div>
    </div>
  );
};

export default PhotoUploadScreen;
