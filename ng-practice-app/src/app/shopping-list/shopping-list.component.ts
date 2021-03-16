import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('tomato', 10),
    new Ingredient('lettuce', 14)
  ];
  selectedIngredient: Ingredient;

  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded = (ingredient: Ingredient): void => {
    this.ingredients.push(ingredient);
  }

  selectIngredient = (ingredient: Ingredient): void => {
    this.selectedIngredient = ingredient;
  }

  onIngredientDeleted = (ingredient: Ingredient): void => {
    this.ingredients.splice(
      this.ingredients.indexOf(ingredient),
      1
    );
  }

}
