import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  private selectedIngredient: Ingredient;
  public newIngredientSelected = new Subject();
  public ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  public getSelectedIngredient = (): Ingredient => {
    return this.selectedIngredient;
  }

  public setSelectedIngredient = (ingredient: Ingredient): void => {
    this.selectedIngredient = ingredient;
    this.newIngredientSelected.next();
  }

  public getIngredientList = (): Ingredient[] => {
    return this.ingredients.slice();
  }

  public addIngredients = (ingredients: Ingredient[]): void => {
    ingredients.forEach(newIngredient => {
      const existingIngredient = this.ingredients.find(existing =>
        existing.name.toLowerCase().trim() === newIngredient.name.toLowerCase().trim()
      );
      if (!existingIngredient) {
        this.ingredients.push(newIngredient);
      } else {
        existingIngredient.quantity += newIngredient.quantity;
      }
    });
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient = (ingredient: Ingredient): void => {
    this.ingredients = this.ingredients.filter(ing => ing !== ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
