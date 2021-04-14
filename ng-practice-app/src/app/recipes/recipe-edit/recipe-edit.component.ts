import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Ingredient } from '@models/ingredient.model';
import { Recipe } from '@models/recipe.model';
import { RecipesService } from '@services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('recipeForm') recipeForm: NgForm;
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  private recipeId: string;
  public dataLoading = false;
  public editMode = false;
  public previewMode = false;
  public recipe: Recipe;
  public ingredientName: string;
  public ingredientQuantity: number;
  public ingredientUnit: string;
  public ingredientsChanged = false;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.recipeId = this.currentRoute.snapshot.params.id;
    if (this.recipeId) {
      this.editMode = true;
      this.recipeService.getSelectedRecipe(this.recipeId).subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
          this.dataLoading = false;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.editMode = false;
      this.recipe = new Recipe('', '', '', []);
      this.dataLoading = false;
    }
  }

  public togglePreview = (): void => {
    this.previewMode = !this.previewMode;
  };

  public addIngredientToRecipe = () => {
    this.recipe.ingredients.push(
      new Ingredient(
        this.ingredientName,
        this.ingredientQuantity,
        this.ingredientUnit
      )
    );
    this.ingredientsChanged = true;
    this.ingredientForm.resetForm();
  };

  public deleteIngredient = (ingredient: Ingredient): void => {
    this.recipe.ingredients = this.recipe.ingredients.filter(
      (existingIngredient) => existingIngredient !== ingredient
    );
    this.ingredientsChanged = true;
  };

  public saveChanges = (): void => {
    if (this.editMode) {
      this.recipeService.changeRecipe(this.recipe);
      this.router.navigate(['/recipes', this.recipe.id]);
    } else {
      this.recipeService.addRecipe(this.recipe);
      this.router.navigate(['/recipes']);
    }
  };

  public validClear = (): boolean => {
    return this.recipe.name ||
      this.recipe.description ||
      this.recipe.imgPath ||
      this.ingredientName ||
      this.ingredientQuantity ||
      this.ingredientUnit
      ? true
      : false;
  };

  public clearForms = (): void => {
    this.recipeForm.resetForm();
    this.ingredientForm.resetForm();
    console.log(this.recipeForm);
  };

  public cancelChanges = (): void => {
    if (
      (this.recipeForm.dirty || this.ingredientsChanged) &&
      this.recipeForm.valid
    ) {
      const confirmCancel = confirm(
        'Are you sure you want to cancel your changes?'
      );
      if (confirmCancel) {
        this.router.navigate(['../'], { relativeTo: this.currentRoute });
      }
    } else {
      this.router.navigate(['../'], { relativeTo: this.currentRoute });
    }
  };
}
