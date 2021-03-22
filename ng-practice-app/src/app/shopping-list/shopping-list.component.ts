import { Component, OnInit, Renderer2 } from '@angular/core';
import {Ingredient} from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[];
  private lastSelected: EventTarget;

  constructor(private shoppingList: ShoppingListService, private renderer: Renderer2) {
    this.ingredients = this.shoppingList.getIngredientList();
  }

  ngOnInit(): void {
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
