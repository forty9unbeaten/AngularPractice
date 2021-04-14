import { Ingredient } from '@models/ingredient.model';
import * as slActions from '@shoppingList/state/shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;
  selectedIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [],
  selectedIngredient: null,
  selectedIndex: -1,
};

export const shoppingListReducer = (
  state = initialState,
  action: slActions.ShoppingListActions
) => {
  switch (action.type) {
    case slActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }

    case slActions.ADD_INGREDIENTS: {
      const ingredients = [...state.ingredients];

      action.payload.forEach((newIngredient) => {
        // find duplicates and increase existing quantities
        const existingIndex = ingredients.indexOf(newIngredient);
        if (existingIndex === -1) {
          ingredients.push(newIngredient);
        } else {
          ingredients[existingIndex].quantity += newIngredient.quantity;
        }
      });

      return {
        ...state,
        ingredients: ingredients,
      };
    }

    case slActions.EDIT_INGREDIENT: {
      const updatedIngredient = {
        ...state.ingredients[action.payload.index],
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    }

    case slActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (existingIngredient, index) => index !== action.payload
        ),
      };
    }

    case slActions.SELECT_INGREDIENT: {
      return {
        ...state,
        selectedIngredient: action.payload.ingredient,
        selectedIndex: action.payload.index,
      };
    }

    case slActions.ABORT_EDIT: {
      return {
        ...state,
        selectedIngredient: null,
        selectedIndex: -1,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
