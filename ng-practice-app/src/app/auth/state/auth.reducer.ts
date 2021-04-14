import { User } from '@models/user.model';
import * as authActions from '@auth/state/auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: authActions.AuthActions
) => {
  switch (action.type) {
    case authActions.LOGIN: {
      return {
        ...state,
        user: new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate
        ),
      };
    }

    case authActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
