import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    "Window Blinds & Shades",
    "No-Drill Blinds",
    "Motorization",
    "Curtains",
    "Blackout",
    "Shop By",
    "How To",
  ];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-soft">
      {/* Top Banner */}
      <div className="bg-secondary py-2 text-center">
        <p className="text-sm font-medium text-primary">
          Up to 60% Off Sitewide! <span className="underline cursor-pointer hover:opacity-80">Shop Now →</span>
        </p>
      </div>

      {/* Main Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Select<span className="text-secondary">Blinds</span>
              </h1>
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <span className="sr-only">FREE Samples</span>
                <span className="text-xs font-medium">Samples</span>
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 py-3">
            {navItems.map((item) => (
              <li key={item}>
                <Button variant="nav" size="sm" className="text-sm">
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-medium animate-slide-down">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item}>
                  <Button variant="ghost" className="w-full justify-start">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
