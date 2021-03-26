import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
	public recipe: Recipe;
	private routeSub: Subscription;
	
	constructor(
		private recipesService: RecipesService,
		private shoppingList: ShoppingListService,
		private router: Router,
		private currentRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
			this.recipe = this.recipesService.getSelectedRecipe(Number(params.id));
		});
	}

	ngOnDestroy(): void {
		this.routeSub.unsubscribe();
	}

	public onDeleteRecipe = (): void => {
		this.recipesService.deleteRecipe(this.recipe);
		this.router.navigate(['/recipes']);
	}

	public onAddToShoppingList = (): void => {
		this.shoppingList.addIngredients(
			this.recipe.ingredients.map(ingredient => {
				return new Ingredient(ingredient.name, ingredient.quantity, ingredient.measurementUnit);
			})
		);
		this.router.navigate(['/shopping-list']);
	}

}
