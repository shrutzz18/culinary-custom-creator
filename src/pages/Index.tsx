
import RecipeGenerator from "@/components/RecipeGenerator";
import { ChefHat } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-culinary-cream/50 py-8 px-4">
      <header className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <ChefHat className="h-10 w-10 text-culinary-orange" />
          <h1 className="text-4xl font-bold text-culinary-brown">Culinary Custom Creator</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create personalized recipes based on your available ingredients and preferences.
        </p>
      </header>
      
      <main>
        <RecipeGenerator />
      </main>
      
      <footer className="max-w-6xl mx-auto mt-20 text-center text-gray-500 text-sm">
        <p>© 2025 Culinary Custom Creator. All recipes are generated for inspiration only.</p>
      </footer>
    </div>
  );
};

export default Index;
