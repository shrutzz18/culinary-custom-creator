
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IngredientInput from "./IngredientInput";
import RecipeCard from "./RecipeCard";
import { generateRecipe, MealType, Recipe, RecipeInput } from "@/utils/recipeUtils";
import { useToast } from "@/components/ui/use-toast";
import { UtensilsCrossed, Loader2 } from "lucide-react";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [mealType, setMealType] = useState<MealType>("any");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients provided",
        description: "Please add at least one ingredient to generate recipes",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const input: RecipeInput = {
        ingredients,
        excludedIngredients,
        mealType,
      };
      
      const generatedRecipes = await generateRecipe(input);
      setRecipes(generatedRecipes);
      
      if (generatedRecipes.length === 0) {
        toast({
          title: "No recipes found",
          description: "Try different ingredients or meal type",
        });
      }
    } catch (error) {
      toast({
        title: "Error generating recipes",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Recipe Criteria</TabsTrigger>
          <TabsTrigger value="results" disabled={recipes.length === 0}>
            Recipe Results ({recipes.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="form" className="p-4 bg-white rounded-lg shadow-sm mt-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">What would you like to cook?</h2>
              <p className="text-muted-foreground">
                Enter the ingredients you have, select your meal type, and exclude any unwanted ingredients.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <IngredientInput
                  label="Available Ingredients"
                  placeholder="Add an ingredient (e.g., chicken)"
                  items={ingredients}
                  onItemsChange={setIngredients}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Meal Type
                  </label>
                  <Select
                    value={mealType}
                    onValueChange={(value) => setMealType(value as MealType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any meal type</SelectItem>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="dessert">Dessert</SelectItem>
                      <SelectItem value="snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <IngredientInput
                  label="Excluded Ingredients"
                  placeholder="Add ingredients to exclude (e.g., nuts)"
                  items={excludedIngredients}
                  onItemsChange={setExcludedIngredients}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-center pt-2">
              <Button 
                onClick={handleGenerateRecipe} 
                disabled={loading || ingredients.length === 0}
                size="lg"
                className="px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Generate Recipes
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="results" className="mt-4">
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No recipes found. Try adjusting your criteria.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecipeGenerator;
