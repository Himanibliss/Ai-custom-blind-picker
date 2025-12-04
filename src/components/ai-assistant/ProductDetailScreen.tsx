import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPreferences } from "@/pages/AIAssistant";
import { Star, Check, ArrowRight, Sparkles, Shield, Truck, Clock } from "lucide-react";

interface ProductDetailScreenProps {
  onNext: () => void;
  preferences: UserPreferences;
}

const ProductDetailScreen = ({ onNext, preferences }: ProductDetailScreenProps) => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  const recommendedProducts = [
    {
      id: 1,
      name: "Premium Cellular Shades",
      brand: "SelectBlinds Signature",
      rating: 4.8,
      reviews: 2847,
      price: 89,
      originalPrice: 179,
      matchScore: 98,
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=400&fit=crop",
      features: ["Energy Efficient", "Cordless Lift", "Day/Night Option", "Custom Sizes"],
      aiReason: "Perfect match for light filtering with modern aesthetic",
    },
    {
      id: 2,
      name: "Classic Wood Blinds",
      brand: "Natural Collection",
      rating: 4.7,
      reviews: 1923,
      price: 109,
      originalPrice: 219,
      matchScore: 92,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      features: ["Real Wood", "Wand Tilt", "Multiple Slat Sizes", "UV Protection"],
      aiReason: "Great for warm, natural aesthetics",
    },
    {
      id: 3,
      name: "Designer Roller Shades",
      brand: "Modern Series",
      rating: 4.9,
      reviews: 3156,
      price: 75,
      originalPrice: 149,
      matchScore: 88,
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
      features: ["Sleek Design", "Easy Install", "Multiple Fabrics", "Motorized Option"],
      aiReason: "Minimalist design with excellent value",
    },
  ];

  const product = recommendedProducts[selectedProduct];

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI Matched Products</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
            Your Personalized Recommendations
          </h2>
          <p className="text-muted-foreground text-sm">
            Based on your preferences, here are our top picks for you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Product Selector */}
          <div className="space-y-4 animate-slide-up">
            {recommendedProducts.map((prod, index) => (
              <button
                key={prod.id}
                onClick={() => setSelectedProduct(index)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all text-left flex gap-4
                  ${selectedProduct === index
                    ? "border-primary bg-secondary/10 shadow-medium"
                    : "border-border bg-card hover:border-secondary"
                  }
                `}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-primary text-sm truncate">{prod.name}</h4>
                      <p className="text-xs text-muted-foreground">{prod.brand}</p>
                    </div>
                    <div className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full flex-shrink-0">
                      {prod.matchScore}% Match
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{prod.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({prod.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-primary">${prod.price}</span>
                    <span className="text-xs text-muted-foreground line-through">${prod.originalPrice}</span>
                    <span className="text-xs text-green-600 font-semibold">
                      {Math.round((1 - prod.price / prod.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Product Details */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-2xl overflow-hidden shadow-strong">
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-secondary text-primary text-xs font-bold rounded-full">
                  Best Match
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-primary mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* AI Reason */}
                <div className="p-3 bg-secondary/10 rounded-lg mb-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-primary">
                      <span className="font-semibold">AI says:</span> {product.aiReason}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">${product.price}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-2">
                    <Shield className="w-5 h-5 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Fit Guarantee</span>
                  </div>
                  <div className="text-center p-2">
                    <Truck className="w-5 h-5 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Free Shipping</span>
                  </div>
                  <div className="text-center p-2">
                    <Clock className="w-5 h-5 mx-auto text-primary mb-1" />
                    <span className="text-xs text-muted-foreground">Ships in 3 Days</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="hero" size="lg" onClick={onNext} className="w-full group">
                  Continue to Measurements
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
