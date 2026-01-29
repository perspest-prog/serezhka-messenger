import AuthCoontroller from "../utils/controllers/AuthController";
import Router from "./Router";
import Store from "./Store";

// types
type User = {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "phone": string,
    "login": string,
    "avatar": string,
    "email": string
}

interface SetUserAction {
    type: 'SET_USER'
    payload: User
}

interface SetErrorAction {
  type: 'SET_ERROR',
  payload: Error
}

type Action = SetUserAction | SetErrorAction

interface AppState {
    user: User | null
    error: Error | null
}

export type {User, AppState};


// Router Store AuthController initializers
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error();
}

const router = new Router(rootElement);

const store = new Store<AppState, Action>({user: null, error: null}, (previous, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {...previous, user: action.payload}
    case 'SET_ERROR':
      return {...previous, error: action.payload}
  }
});

const AuthController = new AuthCoontroller();

export {store, router, AuthController}


// constants
const DEFAULT_AUTHORIZED_PAGE = '/profile';
const DEFAULT_UNAUTHORIZED_PAGE = '/auth';

export {DEFAULT_AUTHORIZED_PAGE, DEFAULT_UNAUTHORIZED_PAGE}