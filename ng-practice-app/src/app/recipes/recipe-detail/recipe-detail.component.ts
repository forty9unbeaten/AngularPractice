import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;

  constructor(private recipesService: RecipesService, private shoppingList: ShoppingListService) {}

  ngOnInit(): void {
    this.recipe = this.recipesService.getSelectedRecipe();
  }

  public onDeleteRecipe = (): void => {
    this.recipesService.deleteRecipe(this.recipe);
  }

  public onAddToShoppingList = (): void => {
    this.shoppingList.addIngredients(this.recipe.ingredients);
    this.shoppingList.navToShoppingList.emit();
  }

}
