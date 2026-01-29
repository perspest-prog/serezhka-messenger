import BaseApi from "./BaseApi";
import type { User } from "../settings";

class AuthApi extends BaseApi {
  constructor() {
    super('/auth')
  }
  public fetchUser(): Promise<User> {
    return this.http.get<User>('/user')
  }
  public signup(formData: FormData) {
    return this.http.post<void>('/signup', formData)
  }
  public signin(formData: FormData) {
    return this.http.post<void>('/signin', formData)
  }
  public logout() {
    return this.http.post<void>('/logout', new FormData())
  }
}

export default AuthApi;