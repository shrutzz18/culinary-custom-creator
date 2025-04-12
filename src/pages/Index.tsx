
import RecipeGenerator from "@/components/RecipeGenerator";
import { ChefHat, ChevronDown, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
                <NavigationMenuTrigger className="text-culinary-black hover:text-culinary-red bg-transparent py-2">
                  Dropdown
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-4 bg-white shadow-md">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/subpage1" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          Subpage 1
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/subpage2" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          Subpage 2
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/subpage3" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          Subpage 3
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
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
            {/* Enhanced image collage with more images */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-40">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                  alt="Healthy salad" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-40">
                <img 
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187" 
                  alt="Pasta dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-40">
                <img 
                  src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543" 
                  alt="Breakfast spread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-40">
                <img 
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601" 
                  alt="Gourmet plating" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-48">
                <img 
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" 
                  alt="Colorful food spread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-48">
                <img 
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629" 
                  alt="Dessert" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-48">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" 
                  alt="Vegetable dish" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-56">
                <img 
                  src="https://images.unsplash.com/photo-1493770348161-369560ae357d" 
                  alt="Fresh ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-56">
                <img 
                  src="https://images.unsplash.com/photo-1521305916504-4a1121188589" 
                  alt="Artisan food" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="mt-12">
        <RecipeGenerator />
      </main>
      
      <footer className="max-w-6xl mx-auto mt-20 text-center text-culinary-gray text-sm">
        <p>© 2025 Savorithm. All recipes are generated for inspiration only.</p>
      </footer>
    </div>
  );
};

export default Index;
