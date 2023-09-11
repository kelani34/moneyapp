export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

// Define the User type
type User = {
  email: string;
  password: string;
};

//  the state type
export type AuthState = {
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
  user: User | null;
};

// Define the action types
type LoginSuccessAction = { type: typeof LOGIN_SUCCESS; payload: User };
type LoginLoadingAction = { type: typeof LOGIN_LOADING };
type LoginFailAction = { type: typeof LOGIN_FAIL; payload: string };
type logoutAction = { type: typeof LOGOUT;  };

export type AuthAction =
  | LoginSuccessAction
  | LoginLoadingAction
  | LoginFailAction
  | logoutAction;

// Initial state with 'user' property indicating login status
export const initialState: AuthState = {
  loading: false,
  error: null,
  loggedIn: false,
  user: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: true,
        user: action.payload,
      };
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        loggedIn: false,
        user: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        loggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        loggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
