import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Camera, Upload, Image as ImageIcon, X, Sparkles, MapPin, Shield } from "lucide-react";

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

  const sampleImages = [
    {
      id: 'blinds',
      label: 'Blinds',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=200&fit=crop'
    },
    {
      id: 'shades',
      label: 'Shades',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop'
    },
    {
      id: 'shutters',
      label: 'Shutters',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=200&fit=crop'
    },
    {
      id: 'drapes',
      label: 'Drapes',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
    }
  ];

  const handleSampleSelect = (imageUrl: string) => {
    updatePreferences({ photo: imageUrl });
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
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

        {/* Privacy Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 animate-fade-in max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1 text-sm">
                Image Use & Privacy Disclaimer:
              </h4>
              <p className="text-amber-700 text-sm">
                Uploaded photos are used only to generate ideas and visualize blinds in your space. 
                Any sensitive or personal information in the images will be hidden or removed.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area - Two Column Layout */}
        <div className="mb-8 animate-slide-up">
          {!preferences.photo ? (
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              {/* Upload Section */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  relative border-2 border-dashed rounded-2xl p-6 text-center
                  transition-all duration-300 cursor-pointer flex flex-col justify-center
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
                  <div className="w-14 h-14 mb-3 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Upload className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold text-primary mb-1 text-sm">
                    Tap to upload Photo
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    or drag & drop here
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button variant="peachOutline" size="sm" className="gap-1 text-xs">
                      <Camera className="w-3 h-3" />
                      Take Photo
                    </Button>
                    <Button variant="peachOutline" size="sm" className="gap-1 text-xs">
                      <ImageIcon className="w-3 h-3" />
                      Choose File
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sample Photos Section */}
              <div className="flex flex-col">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 bg-secondary/20 rounded-full text-sm font-semibold text-primary mb-2">
                    OR
                  </span>
                  <h3 className="font-semibold text-primary text-sm">
                    Choose one from here
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3 flex-1">
                  {sampleImages.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSampleSelect(sample.image)}
                      className="group relative rounded-xl overflow-hidden border-2 border-border hover:border-secondary transition-all duration-300 hover:scale-[1.02] hover:shadow-medium"
                    >
                      <img
                        src={sample.image}
                        alt={sample.label}
                        className="w-full h-24 md:h-28 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      <span className="absolute bottom-2 left-2 text-primary-foreground text-xs font-semibold">
                        {sample.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden shadow-medium max-w-2xl mx-auto">
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
        <div className="bg-card rounded-xl p-5 mb-8 shadow-soft animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
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
        <div className="flex flex-col items-center gap-3 animate-scale-in" style={{ animationDelay: "0.3s" }}>
          {preferences.photo && !isAnalyzing ? (
            <Button variant="hero" size="lg" onClick={onNext} className="w-full max-w-xs">
              Next
            </Button>
          ) : (
            <Button variant="peach" size="sm" onClick={onSkip}>
              Skip for now
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
