import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import * as slActions from '../../shopping-list/state/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public dataLoading = false;
  private routeSub: Subscription;
  private recipeSub: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      this.recipesService.getSelectedRecipe(params.id).subscribe(
        (recipe: Recipe) => {
          if (recipe) {
            this.recipe = recipe;
            this.dataLoading = false;
          } else {
            this.router.navigate(['/not-found']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    });
    this.recipeSub = this.recipesService.recipeChanged.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.recipeSub.unsubscribe();
  }

  public onDeleteRecipe = (): void => {
    this.recipesService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipes']);
  };

  public onAddToShoppingList = (): void => {
    this.store.dispatch(new slActions.AddIngredients(this.recipe.ingredients));
    this.router.navigate(['/shopping-list']);
  };
}
