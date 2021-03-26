import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'Enchiladas',
      `Tasty enchiladas with red sauce. Just like your abuela used to make!`,
      'https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg',
      [new Ingredient('Tortillas', 2, 'Packs'), new Ingredient('Beef', 1, 'Pound')]
    )
  ];

  public recipesChanged = new Subject<Recipe[]>();
  private generatedId = this.recipes.slice(-1)[0].id + 1;

  constructor() {
  }

  public getRecipeList = (): Recipe[] => {
    return this.recipes.slice();
  }

  public setRecipeList = (recipes: Recipe[]): void => {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public getSelectedRecipe = (id: number): Recipe => {
    return this.recipes.find(recipe => recipe.id === id);
  }

  public addRecipe = (recipe: Recipe): void => {
    recipe.id = this.generatedId;
    this.recipes.push(recipe);
    this.generatedId++;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe = (recipe: Recipe): void => {
    this.recipes = this.recipes.filter(existingRecipe => existingRecipe.id !== recipe.id);
    this.recipesChanged.next(this.recipes.slice());
  }

  public changeRecipe = (recipe: Recipe): void => {
    this.recipes = this.recipes.map((existingRecipe: Recipe) : Recipe => {
      return existingRecipe.id === recipe.id ? recipe : existingRecipe;
    });
    this.recipesChanged.next(this.recipes.slice());
  }
}
