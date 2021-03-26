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
    this.ingredients = this.shoppingList.getIngredientList();
    this.ingredientSub = this.shoppingList.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnDestroy(): void {
    this.ingredientSub.unsubscribe();
  }

  selectIngredient = (ingredient: Ingredient, evt: Event): void => {
    this.shoppingList.setSelectedIngredient(ingredient);
    if (evt.target === this.lastSelected && this.shoppingList.getIngredientList().length > 1) {
      this.renderer.removeClass(evt.target, 'selected')
    }
    if (this.lastSelected) {
      this.renderer.removeClass(this.lastSelected, 'selected');
    }
    this.renderer.addClass(evt.target, 'selected');
    this.lastSelected = evt.target;
  }

}
