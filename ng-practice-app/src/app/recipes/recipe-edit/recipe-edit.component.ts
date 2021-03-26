import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('recipeForm') recipeForm: NgForm;
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  public editMode = false;
  private recipeId: number;
  public recipe: Recipe;
  public ingredientName: string;
  public ingredientQuantity: number;
  public ingredientUnit: string;
  public ingredientsChanged = false;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.recipeId = Number(this.currentRoute.snapshot.params.id);

    if (this.recipeId) {
     this.editMode = true;
     this.recipe = {...this.recipeService.getSelectedRecipe(this.recipeId)};
    } else {
      this.editMode = false;
      this.recipe = new Recipe('', '', '', []);
    }
  }

  public showPreview = (): void => {
  }

  public addIngredientToRecipe = () => {
    this.recipe.ingredients.push(
      new Ingredient(
        this.ingredientName, 
        this.ingredientQuantity, 
        this.ingredientQuantity === 1 ? this.ingredientUnit : `${this.ingredientUnit}s` 
      )
    );
    this.ingredientsChanged = true;
    this.ingredientForm.resetForm();
  }

  public deleteIngredient = (ingredient: Ingredient): void => {
    this.recipe.ingredients = this.recipe.ingredients.filter(
      existingIngredient => existingIngredient !== ingredient
    );
    this.ingredientsChanged = true;
  }

  public saveChanges = (): void => {
    if (this.editMode) {
      this.recipeService.changeRecipe(this.recipe);
      this.router.navigate(['/recipes', this.recipe.id]);
    } else {
      this.recipeService.addRecipe(this.recipe);
      this.router.navigate(['/recipes']);
    }
  }

  public validClear = (): boolean => {
    return (
      this.recipe.name || 
      this.recipe.description || 
      this.recipe.imgPath || 
      this.ingredientName || 
      this.ingredientQuantity || 
      this.ingredientUnit) ? true : false;
  }

  public clearForms = (): void => {
    this.recipeForm.resetForm();
    this.ingredientForm.resetForm();
    console.log(this.recipeForm)
  }

  public cancelChanges = (): void => {
    if ((this.recipeForm.dirty || this.ingredientsChanged) && this.recipeForm.valid) {
      const confirmCancel = confirm("Are you sure you want to cancel your changes?")
      if (confirmCancel) {
        this.router.navigate(['../'], { relativeTo: this.currentRoute });
      }
    } else {
      this.router.navigate(['../'], { relativeTo: this.currentRoute });
    }
  }
}
