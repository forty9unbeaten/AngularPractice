import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  private selectedIngredient: Ingredient;
  private ingredientsURL: string = 'https://angular-practice-8c0db-default-rtdb.firebaseio.com/ingredients'
  public newIngredientSelected = new Subject<{ ingredient: Ingredient, index: number }>();
  public ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private http: HttpClient) { }

  public setSelectedIngredient = (ingredient: Ingredient): void => {
    if (!ingredient) {
      this.newIngredientSelected.next({
        ingredient: null,
        index: 0
      })
    } else {
      this.newIngredientSelected.next({
        ingredient: ingredient,
        index: this.ingredients.indexOf(ingredient)
      });
    }
  }

  public getIngredientList = (): Observable<any> => {
    return this.http.get(`${this.ingredientsURL}.json`)
      .pipe(
        map(
          (ingredients: Ingredient[]) => {
            if (ingredients) {
              this.ingredients = ingredients
            } else {
              this.ingredients = [];
            }
            return this.ingredients.slice();
          }
        )
      )
  }

  public addIngredients = (ingredients: Ingredient[]): void => {
    // find duplicaes and update quantity
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
    this.sendIngredientsToServer();
  }

  public deleteIngredient = (index: number): void => {
    this.ingredients.splice(index, 1);
    this.sendIngredientsToServer();
  }

  public editIngredient = (ingredient: Ingredient, index: number): void => {
    this.ingredients[index] = ingredient;
    this.sendIngredientsToServer();
  }

  private sendIngredientsToServer = (): void => {
    this.http.put(`${this.ingredientsURL}.json`, this.ingredients)
      .subscribe(
        (res: Ingredient[]) => {
          if (res) {
            this.ingredients = res;
          } else {
            this.ingredients = [];
          }
          this.ingredientsChanged.next(this.ingredients.slice())
        },
        error => {
          console.log(error);
        }
      )
  }
}
