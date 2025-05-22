
import RecipeGenerator1 from "@/components/RecipeGenerator1";
import { ChefHat, ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-playfair font-bold text-culinary-black">Savorithm</h1>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <Link to="/" className="text-culinary-black hover:text-culinary-red border-b-2 border-culinary-red py-2 px-3">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className="text-culinary-black hover:text-culinary-red py-2 px-3">
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/recipes" className="text-culinary-black hover:text-culinary-red py-2 px-3">
                  Recipes
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/chefs" className="text-culinary-black hover:text-culinary-red py-2 px-3">
                  Chefs
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/gallery" className="text-culinary-black hover:text-culinary-red py-2 px-3">
                  Gallery
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="text-culinary-black hover:text-culinary-red py-2 px-3">
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3">
            <Link to="#" className="text-culinary-gray hover:text-culinary-black">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="text-culinary-gray hover:text-culinary-black">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="text-culinary-gray hover:text-culinary-black">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="text-culinary-gray hover:text-culinary-black">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-10 mb-8">
          <p className="text-xl text-culinary-gray max-w-2xl mx-auto mb-8">
            Create personalized recipes based on your available ingredients and preferences.
          </p>
          <div className="max-w-4xl mx-auto">
            {/* Auto-playing image carousel with smaller images */}
            <ImageCarousel />
          </div>
        </div>
      </header>
      
      <main className="mt-12">
        <RecipeGenerator1 />
        <Contact />
      </main>
      
      <footer className="max-w-6xl mx-auto mt-20 text-center text-culinary-gray text-sm">
        <p>© 2025 Savorithm. All recipes are generated for inspiration only.</p>
      </footer>
    </div>
  );
};

// Image carousel component with auto-play and smaller images
const ImageCarousel = () => {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      alt: "Healthy salad"
    },
    {
      src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      alt: "Pasta dish"
    },
    {
      src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543",
      alt: "Breakfast spread"
    },
    {
      src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
      alt: "Gourmet plating"
    },
    {
      src: "https://images.unsplash.com/photo-1505935428862-770b6f24f629",
      alt: "Colorful food spread"
    },
    {
      src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      alt: "Dessert"
    },
    {
      src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      alt: "Vegetable dish"
    },
    {
      src: "https://images.unsplash.com/photo-1493770348161-369560ae357d",
      alt: "Fresh ingredients"
    }
  ];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-lg"> {/* Reduced from max-w-2xl to max-w-lg for smaller images */}
        <Carousel opts={{
          align: 'start',
          loop: true,
          autoplay: true, // Enable autoplay
          delay: 3000, // 3 seconds between slides
        }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-64 w-full object-cover transition-all hover:scale-105" // Reduced from h-80 to h-64
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static -translate-y-0 -left-0 mr-2" />
            <CarouselNext className="relative static -translate-y-0 -right-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

// Import the carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default Index;
