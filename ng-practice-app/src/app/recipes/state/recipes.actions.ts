import { Action } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const SELECT_RECIPE = 'SELECT_RECIPE';

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: Recipe) {}
}

export class EditRecipe implements Action {
  readonly type = EDIT_RECIPE;
  constructor(public payload: Recipe) {}
}

export class SelectRecipe implements Action {
  readonly type = SELECT_RECIPE;
  constructor(public payload: Recipe) {}
}

export type RecipeActions =
  | AddRecipe
  | DeleteRecipe
  | EditRecipe
  | SelectRecipe;
