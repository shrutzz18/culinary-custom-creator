
import RecipeGenerator from "@/components/RecipeGenerator";
import { ChefHat } from "lucide-react";

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
        <div className="rounded-lg overflow-hidden shadow-lg max-w-3xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" 
            alt="Colorful food spread" 
            className="w-full h-80 object-cover"
          />
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
