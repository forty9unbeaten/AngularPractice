import * as fromShoppingList from './shopping-list/state/shopping-list.reducer';
import * as fromRecipes from './recipes/state/recipes.reducer';
import * as fromAuth from './auth/state/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  recipes: fromRecipes.RecipeState;
  auth: fromAuth.AuthState;
}

export const reducerMap = {
  shoppingList: fromShoppingList.shoppingListReducer,
  recipes: fromRecipes.recipeReducer,
  auth: fromAuth.authReducer,
};
