import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  public recipeSelected = false;


  constructor(private recipesService: RecipesService) {
    this.recipesService.newRecipeSelected.subscribe(() => {
      this.recipeSelected = this.recipesService.getSelectedRecipe() ? true : false;
    });
    this.recipesService.recipeDeleted.subscribe(() => {
      this.recipeSelected = false;
    });
  }

  ngOnInit(): void {
  }

}
