
import RecipeGenerator from "@/components/RecipeGenerator";
import { ChefHat } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <header className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ChefHat className="h-10 w-10 text-culinary-red" />
          <h1 className="text-4xl font-bold text-culinary-black">Savorithm</h1>
        </div>
        <p className="text-xl text-culinary-gray max-w-2xl mx-auto mb-8">
          Create personalized recipes based on your available ingredients and preferences.
        </p>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-2 mb-2">
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
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg overflow-hidden shadow-sm h-52">
              <img 
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" 
                alt="Colorful food spread" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm h-52">
              <img 
                src="https://images.unsplash.com/photo-1505935428862-770b6f24f629" 
                alt="Dessert" 
                className="w-full h-full object-cover"
              />
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
