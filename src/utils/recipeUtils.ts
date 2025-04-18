
import { toast } from "@/components/ui/use-toast";

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'any';

export interface RecipeInput {
  ingredients: string[];
  excludedIngredients: string[];
  mealType: MealType;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  prepTime: string;
  servings: number;
  image: string;
  tags: string[];
}

// Sample image URLs for recipe cards
const foodImages = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'https://images.unsplash.com/photo-1493770348161-369560ae357d',
];

// This is a mock implementation that would be replaced with a real API call in a production app
export const generateRecipe = (input: RecipeInput): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    // Make sure we have at least one ingredient
    if (input.ingredients.length === 0) {
      toast({
        title: "No ingredients provided",
        description: "Please add at least one ingredient to generate recipes",
        variant: "destructive",
      });
      return resolve([]);
    }
    
    // Simulate API delay
    setTimeout(() => {
      const recipes = mockRecipeGeneration(input);
      resolve(recipes);
    }, 1500);
  });
};

const mockRecipeGeneration = (input: RecipeInput): Recipe[] => {
  const { ingredients, excludedIngredients, mealType } = input;
  
  // Simple logic to generate recipes based on input
  // This would be replaced by a real API call or more sophisticated logic
  const compatibleRecipes = sampleRecipes.filter(recipe => {
    // Check if recipe contains at least one of the ingredients
    const hasIngredient = recipe.ingredients.some(ingredient => 
      ingredients.some(userIngredient => 
        ingredient.toLowerCase().includes(userIngredient.toLowerCase())
      )
    );
    
    // Check that recipe doesn't contain excluded ingredients
    const hasExcluded = recipe.ingredients.some(ingredient => 
      excludedIngredients.some(excluded => 
        ingredient.toLowerCase().includes(excluded.toLowerCase())
      )
    );
    
    // Check that recipe matches meal type
    const matchesMealType = mealType === 'any' || recipe.tags.includes(mealType);
    
    return hasIngredient && !hasExcluded && matchesMealType;
  });
  
  // If no suitable recipes found, generate some mock ones based on the inputs
  if (compatibleRecipes.length === 0) {
    return generateMockRecipes(input);
  }
  
  return compatibleRecipes;
};

const generateMockRecipes = (input: RecipeInput): Recipe[] => {
  const { ingredients, mealType } = input;
  const mainIngredient = ingredients[0] || 'food';
  
  const recipes: Recipe[] = [];
  
  // Generate 1-3 mock recipes
  const numRecipes = Math.floor(Math.random() * 3) + 1;
  
  for (let i = 0; i < numRecipes; i++) {
    const id = `custom-${i}-${Date.now()}`;
    const recipeIngredients = [...ingredients];
    
    // Add some common ingredients
    recipeIngredients.push('salt', 'pepper', 'olive oil');
    
    // Generate a recipe title based on ingredients and meal type
    let title = '';
    switch (mealType) {
      case 'breakfast':
        title = `${capitalize(mainIngredient)} Breakfast Bowl`;
        break;
      case 'lunch':
        title = `Quick ${capitalize(mainIngredient)} Lunch`;
        break;
      case 'dinner':
        title = `Homestyle ${capitalize(mainIngredient)} Dinner`;
        break;
      case 'dessert':
        title = `Sweet ${capitalize(mainIngredient)} Treat`;
        break;
      case 'snack':
        title = `${capitalize(mainIngredient)} Snack Bites`;
        break;
      default:
        title = `${capitalize(mainIngredient)} Delight`;
    }
    
    recipes.push({
      id,
      title,
      description: `A delicious ${mealType} recipe using ${ingredients.join(', ')}.`,
      ingredients: recipeIngredients.map(ing => `${capitalize(ing)} - ${Math.floor(Math.random() * 3) + 1} ${Math.random() > 0.5 ? 'cup' : 'tbsp'}`),
      instructions: [
        `Prepare all ${recipeIngredients.length} ingredients.`,
        `Combine ${mainIngredient} with other ingredients.`,
        `Cook for ${Math.floor(Math.random() * 20) + 10} minutes.`,
        'Serve and enjoy!'
      ],
      cookTime: `${Math.floor(Math.random() * 30) + 10} mins`,
      prepTime: `${Math.floor(Math.random() * 15) + 5} mins`,
      servings: Math.floor(Math.random() * 4) + 2,
      image: foodImages[Math.floor(Math.random() * foodImages.length)],
      tags: [mealType, ...ingredients.slice(0, 2)]
    });
  }
  
  return recipes;
};

// Sample recipe data
const sampleRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Simple Vegetable Stir Fry',
    description: 'A quick and easy vegetable stir fry that\'s perfect for a weeknight dinner.',
    ingredients: [
      'Bell peppers - 2 medium',
      'Broccoli - 1 cup',
      'Carrots - 2 medium',
      'Onion - 1 medium',
      'Garlic - 3 cloves',
      'Ginger - 1 tbsp',
      'Soy sauce - 3 tbsp',
      'Vegetable oil - 2 tbsp',
      'Salt - to taste',
      'Pepper - to taste'
    ],
    instructions: [
      'Chop all vegetables into bite-sized pieces.',
      'Heat oil in a large pan or wok over medium-high heat.',
      'Add onion, garlic, and ginger. Sauté for 1-2 minutes until fragrant.',
      'Add the harder vegetables (carrots, broccoli) first and stir fry for 3-4 minutes.',
      'Add bell peppers and continue cooking for 2-3 minutes.',
      'Add soy sauce, salt, and pepper. Stir well to combine.',
      'Cook for another 2-3 minutes until vegetables are tender but still crisp.',
      'Serve hot with rice or noodles.'
    ],
    cookTime: '15 mins',
    prepTime: '10 mins',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    tags: ['dinner', 'lunch', 'vegetarian', 'quick']
  },
  {
    id: 'recipe-2',
    title: 'Classic Pancakes',
    description: 'Fluffy and delicious pancakes that are perfect for a weekend breakfast.',
    ingredients: [
      'All-purpose flour - 1 cup',
      'Sugar - 2 tbsp',
      'Baking powder - 2 tsp',
      'Salt - 1/4 tsp',
      'Milk - 1 cup',
      'Egg - 1 large',
      'Butter - 2 tbsp, melted',
      'Vanilla extract - 1 tsp'
    ],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In another bowl, beat the egg, then add milk, melted butter, and vanilla extract.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined. Don\'t overmix.',
      'Heat a griddle or frying pan over medium heat. Lightly grease with butter or oil.',
      'Pour 1/4 cup of batter onto the griddle for each pancake.',
      'Cook until bubbles form on the surface, then flip and cook until golden brown.',
      'Serve warm with maple syrup, fruits, or your favorite toppings.'
    ],
    cookTime: '15 mins',
    prepTime: '5 mins',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
    tags: ['breakfast', 'sweet', 'classic']
  },
  {
    id: 'recipe-3',
    title: 'Chicken and Rice Bowl',
    description: 'A satisfying bowl of seasoned chicken and rice with vegetables.',
    ingredients: [
      'Chicken breast - 2 medium',
      'Rice - 1 cup',
      'Bell peppers - 1 medium',
      'Broccoli - 1 cup',
      'Onion - 1 medium',
      'Garlic - 2 cloves',
      'Olive oil - 2 tbsp',
      'Soy sauce - 2 tbsp',
      'Salt - to taste',
      'Pepper - to taste'
    ],
    instructions: [
      'Cook rice according to package instructions.',
      'Cut chicken into bite-sized pieces and season with salt and pepper.',
      'Heat olive oil in a large pan over medium-high heat.',
      'Add chicken and cook until no longer pink, about 5-7 minutes.',
      'Add garlic and onion, sauté for 1-2 minutes.',
      'Add bell peppers and broccoli, cook for another 3-4 minutes.',
      'Add soy sauce and stir to combine.',
      'Serve chicken and vegetables over rice.'
    ],
    cookTime: '20 mins',
    prepTime: '10 mins',
    servings: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    tags: ['dinner', 'lunch', 'protein', 'chicken']
  },
  {
    id: 'recipe-4',
    title: 'Fruit Smoothie Bowl',
    description: 'A refreshing and nutritious smoothie bowl topped with fresh fruits and granola.',
    ingredients: [
      'Banana - 1 frozen',
      'Berries - 1 cup, mixed',
      'Greek yogurt - 1/2 cup',
      'Honey - 1 tbsp',
      'Almond milk - 1/4 cup',
      'Granola - 1/4 cup',
      'Fresh fruits for topping - as desired'
    ],
    instructions: [
      'Add frozen banana, berries, Greek yogurt, honey, and almond milk to a blender.',
      'Blend until smooth and creamy. Add more almond milk if needed for desired consistency.',
      'Pour the smoothie into a bowl.',
      'Top with granola and fresh fruits.',
      'Serve immediately.'
    ],
    cookTime: '0 mins',
    prepTime: '10 mins',
    servings: 1,
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d',
    tags: ['breakfast', 'snack', 'healthy', 'fruit']
  },
  {
    id: 'recipe-5',
    title: 'Mediterranean Pasta Salad',
    description: 'A light and flavorful pasta salad with Mediterranean ingredients.',
    ingredients: [
      'Pasta - 2 cups, cooked',
      'Cherry tomatoes - 1 cup, halved',
      'Cucumber - 1 medium, diced',
      'Red onion - 1/4 cup, diced',
      'Olives - 1/2 cup, halved',
      'Feta cheese - 1/2 cup, crumbled',
      'Olive oil - 3 tbsp',
      'Lemon juice - 2 tbsp',
      'Dried oregano - 1 tsp',
      'Salt - to taste',
      'Pepper - to taste'
    ],
    instructions: [
      'Cook pasta according to package instructions. Drain and let cool.',
      'In a large bowl, combine pasta, tomatoes, cucumber, red onion, olives, and feta cheese.',
      'In a small bowl, whisk together olive oil, lemon juice, dried oregano, salt, and pepper.',
      'Pour the dressing over the pasta salad and toss to combine.',
      'Chill for at least 30 minutes before serving.',
      'Serve cold as a side dish or light meal.'
    ],
    cookTime: '10 mins',
    prepTime: '15 mins',
    servings: 4,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    tags: ['lunch', 'dinner', 'salad', 'pasta']
  }
];

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
