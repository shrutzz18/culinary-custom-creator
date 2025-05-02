import { toast } from "@/hooks/use-toast";

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack' | 'any';

export interface RecipeInput {
  ingredients: string[];
  excludedIngredients: string[];
  mealType: MealType;
  nutrientPreferences: string[];
  timeEnergyLevel?: number;
}

export interface Nutrient {
  name: string;
  amount: string;
  percentDailyValue?: string;
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
  nutrients: Nutrient[];
  complexity?: string;
  dishesUsed?: number;
}

// Expanded collection of food images for more variety
const foodImages = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
  'https://images.unsplash.com/photo-1567620832903-9fc6debc209f',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
  'https://images.unsplash.com/photo-1493770348161-369560ae357d',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
  'https://images.unsplash.com/photo-1484980972926-edee96e0960d',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
  'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
  'https://images.unsplash.com/photo-1432139509613-5c4255815697',
  'https://images.unsplash.com/photo-1504113888839-1c8eb50233d3',
  'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2',
  'https://images.unsplash.com/photo-1506368249639-73a05d6f6488'
];

// Image generator service
class ImageGeneratorService {
  private apiKey: string | null = null;
  
  constructor() {
    // Initialize with a stored API key if available
    this.apiKey = localStorage.getItem('image_generator_api_key');
  }
  
  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('image_generator_api_key', key);
  }
  
  async generateImage(prompt: string): Promise<string> {
    if (!this.apiKey) {
      console.log('No API key set for image generation');
      return this.getFallbackImage();
    }
    
    try {
      const response = await fetch('https://api.runware.ai/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            taskType: "authentication",
            apiKey: this.apiKey
          },
          {
            taskType: "imageInference",
            taskUUID: crypto.randomUUID(),
            positivePrompt: prompt,
            width: 1024,
            height: 1024,
            model: "runware:100@1",
            numberResults: 1,
            outputFormat: "WEBP",
            CFGScale: 1,
            scheduler: "FlowMatchEulerDiscreteScheduler",
            strength: 0.8
          }
        ])
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      
      const data = await response.json();
      
      if (data.data && data.data.length > 0 && data.data[1] && data.data[1].imageURL) {
        return data.data[1].imageURL;
      }
      
      throw new Error('Invalid response from image generator');
    } catch (error) {
      console.error('Error generating image:', error);
      return this.getFallbackImage();
    }
  }
  
  getFallbackImage(): string {
    return getRandomFoodImage();
  }
}

// Create a singleton instance
export const imageGenerator = new ImageGeneratorService();

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
    setTimeout(async () => {
      const recipes = await mockRecipeGeneration(input);
      resolve(recipes);
    }, 1500);
  });
};

const mockRecipeGeneration = async (input: RecipeInput): Promise<Recipe[]> => {
  const { ingredients, excludedIngredients, mealType, nutrientPreferences, timeEnergyLevel = 50 } = input;
  
  // Simple logic to generate recipes based on input
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

    // If user has specified nutrients, filter by those
    let matchesNutrients = true;
    if (nutrientPreferences.length > 0) {
      matchesNutrients = nutrientPreferences.some(nutrient => 
        recipe.nutrients.some(n => n.name.toLowerCase().includes(nutrient.toLowerCase()))
      );
    }
    
    return hasIngredient && !hasExcluded && matchesMealType && matchesNutrients;
  });
  
  // Generate AI images for the recipes where possible
  const updatedRecipes = await Promise.all(compatibleRecipes.map(async recipe => {
    // Create a good prompt for the image generator
    const imagePrompt = `A professional food photograph of ${recipe.title}, ${recipe.description}, appetizing, studio lighting, detailed, high quality food photography`;
    
    try {
      // Try to generate an AI image, fallback to random stock photo
      const imageUrl = await imageGenerator.generateImage(imagePrompt);
      
      return {
        ...recipe,
        image: imageUrl
      };
    } catch (error) {
      console.error('Error generating image for recipe:', error);
      return {
        ...recipe,
        image: getRandomFoodImage()
      };
    }
  }));
  
  // If no suitable recipes found, generate some mock ones based on the inputs
  if (updatedRecipes.length === 0) {
    return generateMockRecipes(input);
  }
  
  return updatedRecipes;
};

// Helper function to get a random food image
const getRandomFoodImage = (): string => {
  return foodImages[Math.floor(Math.random() * foodImages.length)];
};

const generateMockRecipes = async (input: RecipeInput): Promise<Recipe[]> => {
  const { ingredients, mealType, nutrientPreferences, timeEnergyLevel = 50 } = input;
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

    // Generate mock nutrients based on user preferences or default ones
    const nutrients: Nutrient[] = generateNutrients(nutrientPreferences);
    
    // Adjust complexity based on time/energy level
    const instructionSteps = adjustInstructionsByTimeEnergy(timeEnergyLevel);
    const complexity = getComplexityLabel(timeEnergyLevel);
    const dishesUsed = Math.max(1, Math.floor(timeEnergyLevel / 25) + 1);
    
    // Adjust cooking and prep times based on time/energy level
    const cookTime = `${Math.floor(timeEnergyLevel / 5) + 5} mins`;
    const prepTime = `${Math.floor(timeEnergyLevel / 10) + 5} mins`;
    
    // Create a description that's useful for image generation
    const description = `A ${complexity.toLowerCase()} ${mealType} recipe using ${ingredients.join(', ')}.`;
    
    // Generate image prompt for AI
    const imagePrompt = `A professional food photograph of ${title}, ${description}, appetizing, studio lighting, detailed, high quality food photography`;
    
    // Try to generate an AI image, fallback to random stock photo
    let imageUrl;
    try {
      imageUrl = await imageGenerator.generateImage(imagePrompt);
    } catch (error) {
      imageUrl = getRandomFoodImage();
    }
    
    recipes.push({
      id,
      title,
      description,
      ingredients: recipeIngredients.map(ing => `${capitalize(ing)} - ${Math.floor(Math.random() * 3) + 1} ${Math.random() > 0.5 ? 'cup' : 'tbsp'}`),
      instructions: instructionSteps,
      cookTime,
      prepTime,
      servings: Math.floor(Math.random() * 4) + 2,
      image: imageUrl,
      tags: [mealType, ...ingredients.slice(0, 2)],
      nutrients: nutrients,
      complexity,
      dishesUsed
    });
  }
  
  return recipes;
};

// Helper function to adjust recipe instructions based on time/energy level
const adjustInstructionsByTimeEnergy = (timeEnergyLevel: number): string[] => {
  const baseInstructions = [
    'Prepare ingredients',
    'Combine and mix',
    'Cook until done',
    'Serve and enjoy!'
  ];
  
  if (timeEnergyLevel <= 25) {
    // Quick & Easy - minimal steps
    return baseInstructions;
  } else if (timeEnergyLevel <= 50) {
    // Moderate - standard steps
    return [
      'Prepare all ingredients',
      'Combine main ingredients in a bowl',
      'Mix well until combined',
      'Cook for 10-15 minutes',
      'Let rest for a few minutes',
      'Serve and enjoy!'
    ];
  } else if (timeEnergyLevel <= 75) {
    // Involved - more detailed steps
    return [
      'Carefully prepare all ingredients',
      'In a separate bowl, mix dry ingredients',
      'In another bowl, combine wet ingredients',
      'Gradually combine dry and wet ingredients',
      'Let the mixture rest for 5 minutes',
      'Heat your cooking surface to medium heat',
      'Cook in batches for even results',
      'Garnish before serving',
      'Serve warm and enjoy!'
    ];
  } else {
    // Gourmet - complex steps
    return [
      'Precisely measure and prepare all ingredients',
      'Create a mise en place for efficient cooking',
      'In a large mixing bowl, combine the base ingredients',
      'In a separate bowl, create the seasoning mixture',
      'Gradually incorporate the seasonings into the base',
      'Allow the mixture to marinate or rest for optimal flavor development',
      'Preheat your cooking vessel to the exact temperature',
      'Cook in small batches, monitoring closely',
      'Between batches, clean and prepare the cooking surface',
      'Allow the finished dish to rest before serving',
      'Carefully plate with artistic presentation in mind',
      'Garnish with fresh herbs and complementary elements',
      'Serve immediately for the best experience'
    ];
  }
};

// Helper function to get complexity label based on time/energy level
const getComplexityLabel = (timeEnergyLevel: number): string => {
  if (timeEnergyLevel <= 25) return "Quick & Easy";
  if (timeEnergyLevel <= 50) return "Moderate";
  if (timeEnergyLevel <= 75) return "Involved";
  return "Gourmet";
};

// Generate nutrients based on user preferences or default ones
const generateNutrients = (nutrientPreferences: string[]): Nutrient[] => {
  const defaultNutrients = [
    { name: 'Calories', amount: `${Math.floor(Math.random() * 500) + 200} kcal` },
    { name: 'Protein', amount: `${Math.floor(Math.random() * 30) + 5}g`, percentDailyValue: `${Math.floor(Math.random() * 40) + 10}%` },
    { name: 'Carbohydrates', amount: `${Math.floor(Math.random() * 50) + 20}g`, percentDailyValue: `${Math.floor(Math.random() * 30) + 5}%` },
    { name: 'Fat', amount: `${Math.floor(Math.random() * 20) + 5}g`, percentDailyValue: `${Math.floor(Math.random() * 30) + 5}%` },
    { name: 'Fiber', amount: `${Math.floor(Math.random() * 10) + 2}g`, percentDailyValue: `${Math.floor(Math.random() * 20) + 5}%` }
  ];

  if (nutrientPreferences.length === 0) {
    return defaultNutrients;
  }

  const requestedNutrients: Nutrient[] = [];
  
  // Add all the nutrients the user specifically requested
  nutrientPreferences.forEach(preference => {
    // Check if it's a common nutrient we already have
    const existingNutrient = defaultNutrients.find(n => 
      n.name.toLowerCase() === preference.toLowerCase()
    );

    if (existingNutrient) {
      requestedNutrients.push(existingNutrient);
    } else {
      // Generate a new nutrient
      requestedNutrients.push({
        name: capitalize(preference),
        amount: `${Math.floor(Math.random() * 100) + 10}${Math.random() > 0.5 ? 'mg' : 'g'}`,
        percentDailyValue: `${Math.floor(Math.random() * 50) + 5}%`
      });
    }
  });

  // Add some defaults if the user didn't request many nutrients
  if (requestedNutrients.length < 3) {
    const missingNutrients = defaultNutrients
      .filter(n => !requestedNutrients.some(rn => rn.name === n.name))
      .slice(0, 3 - requestedNutrients.length);
    
    return [...requestedNutrients, ...missingNutrients];
  }

  return requestedNutrients;
};

// Sample recipe data - keeping the original data but will have random images applied
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
    tags: ['dinner', 'lunch', 'vegetarian', 'quick'],
    nutrients: [
      { name: 'Calories', amount: '220 kcal' },
      { name: 'Protein', amount: '5g', percentDailyValue: '10%' },
      { name: 'Carbohydrates', amount: '25g', percentDailyValue: '8%' },
      { name: 'Fat', amount: '12g', percentDailyValue: '15%' },
      { name: 'Fiber', amount: '6g', percentDailyValue: '24%' },
      { name: 'Vitamin C', amount: '120mg', percentDailyValue: '133%' }
    ]
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
    tags: ['breakfast', 'sweet', 'classic'],
    nutrients: [
      { name: 'Calories', amount: '310 kcal' },
      { name: 'Protein', amount: '8g', percentDailyValue: '16%' },
      { name: 'Carbohydrates', amount: '42g', percentDailyValue: '14%' },
      { name: 'Fat', amount: '12g', percentDailyValue: '18%' },
      { name: 'Sugar', amount: '10g', percentDailyValue: '20%' },
      { name: 'Calcium', amount: '200mg', percentDailyValue: '20%' }
    ]
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
    tags: ['dinner', 'lunch', 'protein', 'chicken'],
    nutrients: [
      { name: 'Calories', amount: '420 kcal' },
      { name: 'Protein', amount: '32g', percentDailyValue: '64%' },
      { name: 'Carbohydrates', amount: '45g', percentDailyValue: '15%' },
      { name: 'Fat', amount: '12g', percentDailyValue: '18%' },
      { name: 'Fiber', amount: '4g', percentDailyValue: '16%' },
      { name: 'Iron', amount: '3mg', percentDailyValue: '17%' }
    ]
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
    tags: ['breakfast', 'snack', 'healthy', 'fruit'],
    nutrients: [
      { name: 'Calories', amount: '320 kcal' },
      { name: 'Protein', amount: '12g', percentDailyValue: '24%' },
      { name: 'Carbohydrates', amount: '60g', percentDailyValue: '20%' },
      { name: 'Sugar', amount: '42g', percentDailyValue: '84%' },
      { name: 'Fiber', amount: '8g', percentDailyValue: '32%' },
      { name: 'Vitamin C', amount: '85mg', percentDailyValue: '94%' }
    ]
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
    tags: ['lunch', 'dinner', 'salad', 'pasta'],
    nutrients: [
      { name: 'Calories', amount: '380 kcal' },
      { name: 'Protein', amount: '10g', percentDailyValue: '20%' },
      { name: 'Carbohydrates', amount: '48g', percentDailyValue: '16%' },
      { name: 'Fat', amount: '18g', percentDailyValue: '28%' },
      { name: 'Sodium', amount: '650mg', percentDailyValue: '28%' },
      { name: 'Calcium', amount: '180mg', percentDailyValue: '18%' }
    ]
  }
];

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
