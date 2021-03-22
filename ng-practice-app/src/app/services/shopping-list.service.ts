import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('tomato', 10),
    new Ingredient('lettuce', 14)
  ];
  private selectedIngredient: Ingredient;
  public newIngredientSelected = new EventEmitter();

  constructor() { }

  public getSelectedIngredient = (): Ingredient => {
    return this.selectedIngredient;
  }

  public setSelectedIngredient = (ingredient: Ingredient): void => {
    if (ingredient !== this.selectedIngredient) {
      this.selectedIngredient = ingredient;
      this.newIngredientSelected.emit();
    }
  }

  public getIngredientList = (): Ingredient[] => {
    return this.ingredients;
  }

  public addIngredient = (ingredient: Ingredient): void => {
    this.ingredients.push(ingredient);
  }

  public deleteIngredient = (ingredient: Ingredient): void => {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }
}
