import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  public disabledDelete = true;
  public editMode = false;
  private ingredientIndex: number;
  private ingredientSub: Subscription;
  

  constructor(private shoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientSub = this.shoppingList.newIngredientSelected.subscribe((payload: { ingredient: Ingredient, index: number }) => {
      if (!payload.ingredient) {
        this.editMode = false;
        this.ingredientIndex = null;
        this.form.reset();
        return
      }
      this.editMode = true;
      this.ingredientIndex = payload.index;
      this.form.form.patchValue(
        {
          'name': payload.ingredient.name,
          'quantity': payload.ingredient.quantity,
          'unit': payload.ingredient.measurementUnit
        }
      )
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  public onAddIngredient = (): void => {
    const { name, quantity, unit } = this.form.value;
    const ingredient = new Ingredient(name, quantity, unit);
    if (this.editMode) {
      this.shoppingList.editIngredient(ingredient, this.ingredientIndex);
    } else {
      this.shoppingList.addIngredients([ingredient]);
    }
    this.editMode = false;
    this.form.reset();
  }

  public onDeleteIngredient = (): void => {
    this.shoppingList.deleteIngredient(this.ingredientIndex);
    this.editMode = false;
    this.form.reset()
  }

  public onClear = (): void => {
    this.form.reset();
    this.editMode = false;
  }
}
