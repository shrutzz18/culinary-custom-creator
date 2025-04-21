
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat } from "lucide-react";
import { Recipe } from "@/utils/recipeUtils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard1 = ({ recipe }: RecipeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <>
      <Card className="recipe-card overflow-hidden">
        <div 
          className="w-full h-48 bg-cover bg-center" 
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">{recipe.title}</CardTitle>
          <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.prepTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => setShowDetails(true)}
          >
            View Recipe
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
            <DialogDescription>{recipe.description}</DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="space-y-2 list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">{ingredient}</li>
                ))}
              </ul>
              
              <div className="mt-6 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-culinary-orange" />
                  <span className="text-sm">Cook time: {recipe.cookTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4 text-culinary-orange" />
                  <span className="text-sm">Prep time: {recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-culinary-orange" />
                  <span className="text-sm">Servings: {recipe.servings}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ol className="space-y-3 list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm">
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCard1;
