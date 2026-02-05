import { AuthController, UserController } from './controllers'
import Router from './core/Router'
import Store from './core/Store'

// types
type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

interface SetUserAction {
  type: 'SET_USER'
  payload: User
}

interface SetErrorAction {
  type: 'SET_ERROR'
  payload: Error
}

type Action = SetUserAction | SetErrorAction

interface AppState {
  user: User | null
  error: Error | null
}

export type { User, AppState }

// Router Store AuthController UserController initializers
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error()
}

export const router = new Router(rootElement)

export const store = new Store<AppState, Action>({ user: null, error: null }, (previous, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...previous, user: action.payload }
    case 'SET_ERROR':
      return { ...previous, error: action.payload }
  }
})

export const authController = new AuthController()
export const userController = new UserController()

// constants
export const DEFAULT_AUTHORIZED_PAGE = '/profile'
export const DEFAULT_UNAUTHORIZED_PAGE = '/auth'
