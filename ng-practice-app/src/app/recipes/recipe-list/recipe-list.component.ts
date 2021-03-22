import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../models/recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[];

  constructor(private recipeService: RecipesService) {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnInit(): void {
  }

  selectRecipe = (recipe: Recipe) => {
    this.recipeService.setSelectedRecipe(recipe);
  }

}
