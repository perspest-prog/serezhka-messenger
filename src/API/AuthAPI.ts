import BaseAPI from './BaseAPI'
import type { User } from '../settings'

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }
  public fetchUser() {
    return this.http.get<User>('/user')
  }
  public signup(data: FormData) {
    return this.http.post<void>('/signup', data)
  }
  public signin(data: FormData) {
    return this.http.post<void>('/signin', data)
  }
  public logout() {
    return this.http.post<void>('/logout')
  }
}

export default AuthAPI
