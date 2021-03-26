import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public ingName = '';
  public ingQuantity = 0;
  public ingUnit = '';
  public disabledDelete = true;
  private ingredientSub: Subscription;

  constructor(private shoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientSub = this.shoppingList.newIngredientSelected.subscribe(() => {
      this.disabledDelete = !this.shoppingList.getSelectedIngredient();
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  validateClear = (): boolean => {
    return this.ingName || this.ingQuantity > 0 || this.ingUnit ? true : false;
  }

  validateAdd = (): boolean => {
    return this.ingName !== '' && this.ingQuantity > 0 && this.ingUnit ? true : false ;
  }

  clearInputs = (): void => {
    this.ingName = '';
    this.ingQuantity = 0;
    this.ingUnit = '';
  }

  onAddIngredient = (): void => {
    this.shoppingList.addIngredients(
      [
        new Ingredient(
          this.ingName, 
          this.ingQuantity, 
          this.ingQuantity === 1 ? this.ingUnit : `${this.ingUnit}s`
        )
      ]
    );
    this.clearInputs();
  }

  onDeleteIngredient = (ingredient: Ingredient = this.shoppingList.getSelectedIngredient()): void => {
    this.shoppingList.deleteIngredient(ingredient);
    this.disabledDelete = true;
  }
}
