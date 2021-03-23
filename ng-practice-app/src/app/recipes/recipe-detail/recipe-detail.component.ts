import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
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

  constructor(
    private recipesService: RecipesService,
    private shoppingList: ShoppingListService,
    private router: Router,
    private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipe = this.recipesService.getSelectedRecipe(
      Number(this.currentRoute.snapshot.params.id)
    );
  }

  public onDeleteRecipe = (): void => {
    this.recipesService.deleteRecipe(this.recipe);
    this.router.navigate(['/recipes']);
  }

  public onAddToShoppingList = (): void => {
    this.shoppingList.addIngredients(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }

}
