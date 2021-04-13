import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';
import { AppState } from '../app.state';
import * as slActions from './state/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  public dataLoading = false;
  private lastSelected: EventTarget;
  private ingredientSub: Subscription;

  constructor(private renderer: Renderer2, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dataLoading = true;

    this.ingredientSub = this.store
      .select('shoppingList')
      .subscribe((state) => {
        this.ingredients = state.ingredients;
        this.dataLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  selectIngredient = (ingredient: Ingredient, evt: Event): void => {
    if (!this.lastSelected) {
      this.renderer.addClass(evt.target, 'selected');
      this.lastSelected = evt.target;
      this.store.dispatch(
        new slActions.SelectIngredient({
          ingredient: ingredient,
          index: this.ingredients.indexOf(ingredient),
        })
      );
    } else {
      const sameElement = evt.target === this.lastSelected;
      if (sameElement) {
        this.renderer.removeClass(evt.target, 'selected');
        this.lastSelected = null;
        this.store.dispatch(
          new slActions.SelectIngredient({
            ingredient: null,
            index: -1,
          })
        );
      } else {
        this.renderer.removeClass(this.lastSelected, 'selected');
        this.renderer.addClass(evt.target, 'selected');
        this.lastSelected = evt.target;
        this.store.dispatch(
          new slActions.SelectIngredient({
            ingredient: ingredient,
            index: this.ingredients.indexOf(ingredient),
          })
        );
      }
    }
  };
}
