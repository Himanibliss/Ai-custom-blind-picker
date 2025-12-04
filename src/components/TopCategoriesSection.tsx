import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Cellular Shades",
    description: "Energy efficient & stylish",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop",
  },
  {
    name: "Roller Shades",
    description: "Sleek & modern design",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop",
  },
  {
    name: "Wood Blinds",
    description: "Classic natural beauty",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
  },
  {
    name: "Shutters",
    description: "Timeless elegance",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
  },
  {
    name: "Curtains & Drapes",
    description: "Soft & luxurious",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    name: "Outdoor Shades",
    description: "Weather resistant",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop",
  },
];

const TopCategoriesSection = () => {
  return (
    <section className="py-16 bg-tertiary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            Shop Our Top Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular window treatments, crafted with quality and style
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-primary text-sm md:text-base mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="peachOutline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesSection;
