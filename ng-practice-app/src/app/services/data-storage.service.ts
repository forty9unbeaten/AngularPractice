import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from './recipes.service';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesUrl: string = 'https://angular-practice-8c0db-default-rtdb.firebaseio.com/recipes.json';
  private ingredientsUrl: string = 'https://angular-practice-8c0db-default-rtdb.firebaseio.com/ingredients.json';
  
  constructor(
    private http: HttpClient, 
    private recipesService: RecipesService, 
    private slService: ShoppingListService
  ) {}

  saveRecipes = (): void => {
    const recipes = this.recipesService.getRecipeList();
    this.http.put(this.recipesUrl, recipes).subscribe(res => {
      console.log(res);
    })
  }

  saveIngredients = (): void => {
  }

}
