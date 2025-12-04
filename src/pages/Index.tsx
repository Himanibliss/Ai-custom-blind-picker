import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TopCategoriesSection from "@/components/TopCategoriesSection";
import AIBlindsSection from "@/components/AIBlindsSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SelectBlinds - Custom Window Blinds, Shades & Shutters | Up to 60% Off</title>
        <meta name="description" content="Shop custom window blinds, shades, and shutters. Use our AI assistant to find the perfect window treatments for your home. Free samples & guaranteed to fit." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <HeroSection />
          <TopCategoriesSection />
          <AIBlindsSection />
          
          {/* Additional sections can be added here */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
                  Why Choose SelectBlinds?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Quality custom window treatments backed by our Fit Guarantee
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Fit Guarantee", desc: "If it doesn't fit, we'll make it right. Free of charge." },
                  { title: "Free Samples", desc: "Touch and feel our quality materials before you buy." },
                  { title: "Expert Support", desc: "Real people ready to help you every step of the way." },
                ].map((item, i) => (
                  <div key={i} className="text-center p-8 bg-tertiary rounded-2xl shadow-soft hover:shadow-medium transition-shadow">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
