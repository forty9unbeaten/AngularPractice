import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  public dataLoading = false;
  private recipeSub: Subscription;

  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.recipeService.getRecipeList()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
          this.dataLoading = false;
        },
        error => {
          this.dataLoading = false;
        }
      )
    this.recipeSub = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

}
