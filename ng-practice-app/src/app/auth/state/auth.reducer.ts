import { User } from 'src/app/models/user.model';
import * as authActions from './auth.actions';

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
    default: {
      return {
        ...state,
      };
    }
  }
};
