import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Enchiladas',
      `Delicious Enchiladas...`,
      'https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg',
      [new Ingredient('Tortillas', 2), new Ingredient('Beef (1LB)', 1)]
    )
  ];
  private generatedId = this.recipes.slice(-1)[0].id + 1;
  public recipesChanged = new EventEmitter<Recipe[]>();
  public switchToShoppingList = new EventEmitter();

  constructor() {
  }

  public getRecipeList = (): Recipe[] => {
    return this.recipes.slice();
  }

  public setRecipeList = (recipes: Recipe[]): void => {
    this.recipes = recipes;
    this.recipesChanged.emit(this.recipes.slice());
  }

  public getSelectedRecipe = (id: number): Recipe => {
    return this.recipes.find(recipe => recipe.id === id);
  }

  public addRecipe = (name: string, description: string, imgPath: string, ingredients: Ingredient[]): void => {
    this.recipes.push(
      new Recipe(
        this.generatedId,
        name,
        description,
        imgPath,
        ingredients
      )
    );
    this.generatedId++;
    this.recipesChanged.emit(this.recipes.slice());
  }

  public deleteRecipe = (recipe: Recipe): void => {
    this.recipes = this.recipes.filter(existingRecipe => existingRecipe !== recipe);
    this.recipesChanged.emit(this.recipes.slice());
  }
}
