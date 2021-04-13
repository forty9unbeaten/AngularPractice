import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import * as slActions from '../state/shopping-list.actions';
import * as fromShoppingList from '../state/shopping-list.reducer';
import { AppState } from '../../app.state';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

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

    this.authSub = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
    this.authSub.unsubscribe();
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
        new slActions.EditIngredient({
          ingredient: ingredient,
          index: this.ingredientIndex,
        })
      );
    } else {
      this.store.dispatch(new slActions.AddIngredient(ingredient));
    }
    this.editMode = false;
    this.form.reset();
  };

  public onDeleteIngredient = (): void => {
    if (!this.authenticated) {
      this.router.navigate(['/auth']);
      return;
    }
    this.store.dispatch(new slActions.DeleteIngredient(this.ingredientIndex));
    this.editMode = false;
    this.form.reset();
  };

  public onClear = (): void => {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(
      new slActions.SelectIngredient({
        ingredient: null,
        index: -1,
      })
    );
  };
}
