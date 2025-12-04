import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Check, ShoppingCart, Download, Share2, Star, Sparkles, Shield, Truck } from "lucide-react";

interface SummaryScreenProps {
  preferences: UserPreferences;
  onClose: () => void;
}

const SummaryScreen = ({ preferences, onClose }: SummaryScreenProps) => {
  const recommendedProduct = {
    name: "Premium Cellular Shades",
    brand: "SelectBlinds Signature",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=400&fit=crop",
    price: 89,
    originalPrice: 179,
    rating: 4.8,
    reviews: 2847,
    matchScore: 98,
  };

  const userSelections = [
    { label: "Light Preference", value: preferences.sunlightPreference || "Light Filtering" },
    { label: "Style", value: preferences.blindType || "Shades" },
    { label: "Color", value: preferences.colorChoice || "White / Cream" },
    { label: "Mount Type", value: preferences.mountType || "Inside Mount" },
    { label: "Operation", value: preferences.motorized ? "Motorized" : "Cordless" },
    { label: "Child Safety", value: preferences.childSafety ? "Yes" : "Not Required" },
    { label: "Budget", value: preferences.budget || "$200 - $400" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Your Perfect Match is Ready!
          </h2>
          <p className="text-muted-foreground">
            Based on your preferences, we've found the ideal blinds for your space
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Product Summary */}
          <div className="bg-card rounded-2xl overflow-hidden shadow-strong animate-slide-up">
            <div className="relative">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {recommendedProduct.matchScore}% Match
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-primary mb-1">
                {recommendedProduct.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{recommendedProduct.brand}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(recommendedProduct.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({recommendedProduct.reviews.toLocaleString()})
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-primary">${recommendedProduct.price}</span>
                <span className="text-muted-foreground line-through">${recommendedProduct.originalPrice}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  50% OFF
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Shield className="w-3 h-3" />
                  <span>Fit Guarantee</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Truck className="w-3 h-3" />
                  <span>Free Shipping</span>
                </div>
              </div>

              <Button variant="hero" className="w-full gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Your Selections */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="bg-card rounded-2xl p-5 shadow-soft mb-4">
              <h3 className="font-semibold text-primary mb-4">Your Selections</h3>
              <div className="space-y-3">
                {userSelections.map((selection) => (
                  <div key={selection.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{selection.label}</span>
                    <span className="text-sm font-medium text-primary">{selection.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            {preferences.photo && (
              <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
                <div className="p-3 border-b border-border">
                  <h4 className="font-semibold text-primary text-sm">Your Room Preview</h4>
                </div>
                <img
                  src={preferences.photo}
                  alt="Your room"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button variant="peachOutline" size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Save Quote
          </Button>
          <Button variant="peachOutline" size="lg" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="secondary" size="lg" className="md:col-span-2">
            Continue Shopping
          </Button>
        </div>

        {/* More Recommendations */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h3 className="font-display text-xl font-bold text-primary mb-4 text-center">
            You May Also Like
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Roller Shades", price: 75, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200&h=200&fit=crop" },
              { name: "Wood Blinds", price: 109, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop" },
              { name: "Sheer Shades", price: 95, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
            ].map((item) => (
              <div key={item.name} className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h4 className="text-xs font-medium text-primary truncate">{item.name}</h4>
                  <p className="text-sm font-bold text-primary">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8 animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <Button variant="heroLight" size="lg" onClick={onClose}>
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
