import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChefHat, ArrowRight, ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import RecipeGenerator from "@/components/RecipeGenerator";

// Local asset: hero screenshot image
const heroImage = "/lovable-uploads/34722923-e83b-4a9a-b4c8-c32adb793ca5.png";

const Index = () => {
  const creatorRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    creatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4f4f6] to-white">
      {/* Header/Nav */}
      <header className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 border-b bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-playfair text-3xl font-bold text-culinary-red">S</span>
          <span className="font-playfair text-2xl font-bold text-culinary-black">avorithm</span>
        </div>
        <nav className="flex gap-8 text-base font-medium">
          <Link to="/" className="text-culinary-red border-b-2 border-culinary-red pb-1 hover:text-culinary-red transition">Home</Link>
          <Link to="/about" className="text-culinary-black hover:text-culinary-red transition">About</Link>
          <Link to="/recipes" className="text-culinary-black hover:text-culinary-red transition">Recipes</Link>
          <Link to="/gallery" className="text-culinary-black hover:text-culinary-red transition">Gallery</Link>
          <Link to="/contact" className="text-culinary-black hover:text-culinary-red transition">Contact</Link>
        </nav>
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search recipes..."
            className="px-3 py-1.5 rounded border text-sm outline-none"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 pt-14 pb-10 md:pb-24 md:pt-24">
        {/* Left */}
        <div className="max-w-xl w-full md:w-1/2 text-left space-y-8">
          <div>
            <h1 className="font-playfair text-5xl sm:text-6xl font-bold leading-tight text-culinary-black mb-3">
              <span className="text-culinary-red block">Your Personalised</span>Cooking Companion
            </h1>
            <p className="mt-2 text-lg text-gray-600 font-normal">
              We create personalized recipes that match your mood, preferences, and available ingredients.
              Let our AI-powered platform transform your cooking experience.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <Button
              size="lg"
              className="bg-culinary-red text-white hover:bg-culinary-red/90 flex items-center px-6 py-3 text-lg rounded-full"
              onClick={handleGetStarted}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <button className="ml-1 flex items-center gap-1 border border-gray-200 bg-white px-5 py-3 rounded-full shadow hover:shadow-md transition text-gray-700 text-base font-medium">
              <span className="h-7 w-7 rounded-full flex items-center justify-center bg-gray-100 mr-2">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><circle cx="9" cy="9" r="7" stroke="red" strokeWidth="2" fill="white"/><polygon points="8,7 14,10 8,13" fill="red"/></svg>
              </span>
              Watch Video
            </button>
          </div>
        </div>
        {/* Right (image area) */}
        <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src={heroImage}
              alt="Savorithm Hero Screenshot"
              className="rounded-3xl shadow-2xl w-[380px] md:w-[480px] border-4 border-white object-cover"
              style={{ maxWidth: "100%" }}
            />
            {/* Floating labels */}
            <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 shadow text-xs font-bold rotate-[-10deg] text-culinary-red border border-culinary-red">
              100+ Cuisine Types
            </div>
            <div className="absolute bottom-7 right-1 bg-white rounded-xl px-3 py-2 shadow text-xs font-bold rotate-3 text-orange-500 border border-orange-400">
              Mood-Based Recipe Generation
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-7xl mx-auto px-4 mt-10 mb-0">
        <div className="text-center pb-9">
          <span className="text-culinary-red font-bold tracking-wide uppercase text-sm">About Us</span>
          <h2 className="mt-1 text-4xl md:text-5xl font-bold font-playfair">
            <span>Learn More </span>
            <span className="text-culinary-red font-playfair">About Us</span>
          </h2>
        </div>
      </section>

      {/* Culinary Custom Creator (Recipe Generator) */}
      <section ref={creatorRef} className="pt-0 px-4 pb-20 bg-white">
        {/* mini title for section */}
        <h3 className="text-center text-lg font-semibold mb-3 text-culinary-black">
          Culinary Custom Creator
        </h3>
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            {/* RecipeGenerator component is your culinary custom creator */}
            <div className="rounded-xl border shadow p-4 bg-white">
              <RecipeGenerator />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8 text-center text-culinary-gray text-sm pb-10">
        <p>© 2025 Savorithm. All recipes are generated for inspiration only.</p>
      </footer>
    </div>
  );
};

export default Index;
