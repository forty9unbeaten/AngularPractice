import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '@models/ingredient.model';
import * as fromShoppingList from '@shoppingList/state';
import * as fromAuth from '@auth/state';
import { AppState } from '@app/app.state';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  public disabledDelete = true;
  public editMode = false;
  private ingredientIndex: number;
  private ingredientSub: Subscription;
  private authenticated = false;
  private authSub: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredientSub = this.store
      .select('shoppingList')
      .subscribe((state: fromShoppingList.ShoppingListState) => {
        if (state.selectedIngredient) {
          this.editMode = true;
          this.ingredientIndex = state.selectedIndex;
          this.form.form.patchValue({
            name: state.selectedIngredient.name,
            quantity: state.selectedIngredient.quantity,
            unit: state.selectedIngredient.measurementUnit,
          });
        } else {
          if (this.ingredientIndex) {
            this.form.reset();
          }
          this.editMode = false;
          this.ingredientIndex = null;
        }
      });

    this.authSub = this.store
      .select('auth')
      .subscribe((state: fromAuth.AuthState) => {
        this.authenticated = state.user !== null;
      });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
    this.authSub.unsubscribe();
    this.store.dispatch(new fromShoppingList.AbortEdit());
  }

  public onAddIngredient = (): void => {
    if (!this.authenticated) {
      this.router.navigate(['/auth']);
      return;
    }
    const { name, quantity, unit } = this.form.value;
    const ingredient = new Ingredient(name, quantity, unit);
    if (this.editMode) {
      this.store.dispatch(
        new fromShoppingList.EditIngredient({
          ingredient: ingredient,
          index: this.ingredientIndex,
        })
      );
    } else {
      this.store.dispatch(new fromShoppingList.AddIngredient(ingredient));
    }
    this.editMode = false;
    this.form.reset();
  };

  public onDeleteIngredient = (): void => {
    if (!this.authenticated) {
      this.router.navigate(['/auth']);
      return;
    }
    this.store.dispatch(
      new fromShoppingList.DeleteIngredient(this.ingredientIndex)
    );
    this.editMode = false;
    this.form.reset();
  };

  public onClear = (): void => {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(
      new fromShoppingList.SelectIngredient({
        ingredient: null,
        index: -1,
      })
    );
  };
}
