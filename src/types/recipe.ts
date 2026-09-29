export interface IngredientItem {
    ingredient: string;
    quantity?: number | string;
    unit?: string;
    unite?: string;
}

export interface Recipe {
    id: number;
    image: string;
    name: string;
    servings: number;
    ingredients: IngredientItem[];
    time: number;
    description: string;
    appliance: string;
    ustensils: string[];
}
