import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from '../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Enchiladas',
      `Delicious Enchiladas...`,
      'https://www.yellowblissroad.com/wp-content/uploads/2020/02/Ground-Beef-Enchiladas-social.jpg',
      [new Ingredient('Tortillas', 2), new Ingredient('Beef (1LB)', 1)])
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectRecipe = (recipe: Recipe) => {
    this.recipeSelected.emit(recipe);
  }

}
