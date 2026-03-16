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

type Password = {
  'oldPassword': string,
  'newPassword': string,
  'repeatNewPassword': string
}

type formVariant = 'user' | 'editPassword'

interface SetUserAction {
  type: 'SET_USER'
  payload: User
}

interface SetErrorAction {
  type: 'SET_ERROR'
  payload: Error
}

interface SetPasswordAction {
  type: 'SET_PASSWORD',
  payload: Password
}

interface SetFormVariantActon {
  type: 'SET_FORMVARIANT'
  payload: formVariant
}

type Action = SetUserAction | SetErrorAction | SetPasswordAction | SetFormVariantActon

interface AppState {
  user: User | null
  password: Password | null
  formVariant: formVariant
  error: Error | null
}

export type { User, AppState }

// Router Store AuthController UserController initializers
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error()
}

export const router = new Router(rootElement)

export const store = new Store<AppState, Action>({ user: null, password: null, error: null, formVariant: 'user' }, (previous, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...previous, user: action.payload }
    case 'SET_PASSWORD':
      return { ...previous, password: action.payload }
    case 'SET_FORMVARIANT':
      return { ...previous, formVariant: action.payload }
    case 'SET_ERROR':
      return { ...previous, error: action.payload }
      
  }
})

export const authController = new AuthController()
export const userController = new UserController()

// constants
export const BASE_URL = 'https://ya-praktikum.tech/api/v2/resources'
export const DEFAULT_AUTHORIZED_PAGE = '/profile'
export const DEFAULT_UNAUTHORIZED_PAGE = '/auth'
