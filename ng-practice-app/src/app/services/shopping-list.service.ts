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
  public ingredientsChanged = new EventEmitter<Ingredient[]>();
  public navToShoppingList = new EventEmitter();

  constructor() { }

  public getSelectedIngredient = (): Ingredient => {
    return this.selectedIngredient;
  }

  public setSelectedIngredient = (ingredient: Ingredient): void => {
    this.selectedIngredient = ingredient;
    this.newIngredientSelected.emit();
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
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  public deleteIngredient = (ingredient: Ingredient): void => {
    this.ingredients = this.ingredients.filter(ing => ing !== ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
