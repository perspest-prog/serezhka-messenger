import BaseAPI from "./BaseAPI";

type UserInfo = {
    "id": number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "phone": string,
    "login": string,
    "avatar": string,
    "email": string
}

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }
  public fetchUser(): Promise<UserInfo> {
    return this.http.get<UserInfo>('/user')
  }
  public signup(formData: FormData) {
    return this.http.post<void>('/signup', formData)
  }
  public signin(formData: FormData) {
    return this.http.post<void>('/signin', formData)
  }
  public logout() {
    return this.http.post<void>('/logout')
  }
}

export default AuthAPI