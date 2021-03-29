import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  private selectedIngredient: Ingredient;
  public newIngredientSelected = new Subject<{ ingredient: Ingredient, index: number }>();
  public ingredientsChanged = new Subject<Ingredient[]>();

  constructor() { }

  public getSelectedIngredient = (): Ingredient => {
    return this.selectedIngredient;
  }

  public setSelectedIngredient = (ingredient: Ingredient): void => {
    this.selectedIngredient = ingredient;
    this.newIngredientSelected.next({
      ingredient: ingredient,
      index: this.ingredients.indexOf(this.selectedIngredient)
    });
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
        if (existingIngredient.quantity === 1) {
          existingIngredient.measurementUnit = `${existingIngredient.measurementUnit}s`;
        };
        existingIngredient.quantity += newIngredient.quantity;
      }
    });
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient = (index: number): void => {
    this.ingredients = this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public editIngredient = (ingredient: Ingredient, index: number): void => {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
