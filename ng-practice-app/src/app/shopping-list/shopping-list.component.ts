import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import {Ingredient} from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  private lastSelected: EventTarget;
  private ingredientSub: Subscription;

  constructor(private shoppingList: ShoppingListService, private renderer: Renderer2) {}
  
  ngOnInit(): void {
    this.shoppingList.getIngredientList()
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
    this.ingredientSub = this.shoppingList.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  selectIngredient = (ingredient: Ingredient, evt: Event): void => {
    if (!this.lastSelected) {

      this.renderer.addClass(evt.target, 'selected')
      this.lastSelected = evt.target;
      this.shoppingList.setSelectedIngredient(ingredient)

    } else {

      const sameElement = evt.target === this.lastSelected;
      if (sameElement) {
        this.renderer.removeClass(evt.target, 'selected');
        this.lastSelected = null;
        this.shoppingList.setSelectedIngredient(null);
      } else {
        this.renderer.removeClass(this.lastSelected, 'selected')
        this.renderer.addClass(evt.target, 'selected');
        this.lastSelected = evt.target;
        this.shoppingList.setSelectedIngredient(ingredient)
      }
    }
  }
}
