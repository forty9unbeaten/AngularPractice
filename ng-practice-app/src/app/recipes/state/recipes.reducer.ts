import { Recipe } from 'src/app/models/recipe.model';
import * as recipeActions from './recipes.actions';

export interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe;
  selectedIndex: number;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
  selectedIndex: -1,
};

export const recipeReducer = (
  state: RecipeState = initialState,
  action: recipeActions.RecipeActions
) => {
  switch (action.type) {
    default: {
      return {
        ...state,
      };
    }
  }
};
