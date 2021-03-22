import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  public ingName = '';
  public ingQuantity = 0;
  public disabledDelete = true;

  constructor(private shoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList.newIngredientSelected.subscribe(() => {
      this.disabledDelete = !this.shoppingList.getSelectedIngredient();
    });
  }

  validateClear = (): boolean => {
    return this.ingName !== '' || this.ingQuantity !== 0 ? true : false;
  }

  validateAdd = (): boolean => {
    return this.ingName !== '' && this.ingQuantity !== 0 ? true : false ;
  }

  clearInputs = (): void => {
    this.ingName = '';
    this.ingQuantity = 0;
  }

  onAddIngredient = (): void => {
    this.shoppingList.addIngredients(
      [new Ingredient(this.ingName, this.ingQuantity)]
    );
    this.clearInputs();
  }

  onDeleteIngredient = (ingredient: Ingredient = this.shoppingList.getSelectedIngredient()): void => {
    this.shoppingList.deleteIngredient(ingredient);
    this.disabledDelete = true;
  }
}
