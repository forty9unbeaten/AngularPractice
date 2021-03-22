import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(private recipesService: RecipesService) {
    this.recipe = this.recipesService.getSelectedRecipe();
  }

  ngOnInit(): void {
  }

  public onDeleteRecipe = (): void => {
    this.recipesService.deleteRecipe(this.recipe);
  }

  public onAddToShoppingList = (): void => {
    this.recipesService.addIngredients(this.recipe.ingredients);
  }

}
