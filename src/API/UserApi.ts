import type { User } from "../settings";
import BaseAPI from "./BaseAPI";

class UserApi extends BaseAPI {
  constructor() {
    super('/user')
  }
  public editProfile(data: FormData) {
    return this.http.put<User>('/profile', data)
  }
  public editAvatar(data: FormData) {
    return this.http.put<User>('/profile/avatar', data, undefined, false)
  }
  public editPassword(data: FormData) {
    return this.http.put<void>('/password', data)
  }
  public fetchUser(data: FormData) {
    return this.http.get<User>('/search', data)
  }
}

export default UserApi;