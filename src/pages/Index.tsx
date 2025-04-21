import RecipeGenerator1 from "@/components/RecipeGenerator1";
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
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" 
                  alt="Healthy salad" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187" 
                  alt="Pasta dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543" 
                  alt="Breakfast spread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601" 
                  alt="Gourmet plating" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" 
                  alt="Colorful food spread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629" 
                  alt="Dessert" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" 
                  alt="Vegetable dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1493770348161-369560ae357d" 
                  alt="Fresh ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1521305916504-4a1121188589" 
                  alt="Artisan food" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1495521821757-a1efb6729352" 
                  alt="Seasonal berries" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" 
                  alt="Mediterranean plate" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1540914124281-342587941389" 
                  alt="Baking ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f" 
                  alt="Homemade pasta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1478145046317-39f10e56b5e9" 
                  alt="Roasted vegetables" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1529042410759-befb1204b468" 
                  alt="Baked bread" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061" 
                  alt="Food preparation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8" 
                  alt="Grilled dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1560611588-163f49a6cbe9" 
                  alt="Chocolate dessert" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1531089073319-17596b946d42" 
                  alt="Fresh herbs" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1547592180-85f173990554" 
                  alt="Fruit arrangement" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1" 
                  alt="Coffee art" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1560611588-163f49a6cbe9" 
                  alt="Seafood dish" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1516684732162-798a0062be99" 
                  alt="Italian cuisine" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-sm h-20">
                <img 
                  src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9" 
                  alt="Burger" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="mt-12">
        <RecipeGenerator1 />
      </main>
      
      <footer className="max-w-6xl mx-auto mt-20 text-center text-culinary-gray text-sm">
        <p>© 2025 Savorithm. All recipes are generated for inspiration only.</p>
      </footer>
    </div>
  );
};

export default Index;
