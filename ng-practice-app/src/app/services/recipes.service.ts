import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Enchiladas',
      `Delicious Enchiladas...`,
      'https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg',
      [new Ingredient('Tortillas', 2), new Ingredient('Beef (1LB)', 1)]
    )
  ];
  private selectedRecipe: Recipe;
  public newRecipeSelected = new EventEmitter();
  public recipesChanged = new EventEmitter<Recipe[]>();
  public recipeDeleted = new EventEmitter();
  public switchToShoppingList = new EventEmitter();

  constructor() { }

  public getRecipes = (): Recipe[] => {
    return this.recipes.slice();
  }

  public getSelectedRecipe = (): Recipe => {
    return this.selectedRecipe;
  }

  public setSelectedRecipe = (recipe: Recipe): void => {
    this.selectedRecipe = recipe;
    this.newRecipeSelected.emit();
  }

  public addRecipe = (recipe: Recipe): void => {
    this.recipes.push(recipe);
    this.recipesChanged.emit(this.recipes.slice());
  }

  public deleteRecipe = (recipe: Recipe): void => {
    this.recipes = this.recipes.filter(existingRecipe => existingRecipe !== recipe);
    this.recipesChanged.emit(this.recipes.slice());
    this.recipeDeleted.emit();
  }
}
