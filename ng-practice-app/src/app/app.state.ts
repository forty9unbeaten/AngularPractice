import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '@shoppingList/state';
import * as fromRecipes from '@recipes/state';
import * as fromAuth from '@auth/state';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  recipes: fromRecipes.RecipeState;
  auth: fromAuth.AuthState;
}

export const reducerMap: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  recipes: fromRecipes.recipeReducer,
  auth: fromAuth.authReducer,
};
