import { UserApi } from "../API";
import { store } from "../settings";

class UserController {
  private api = new UserApi()

  constructor() { }

  public async editUser(formData: FormData) {
    try {
      const payload = await this.api.editProfile(formData)
      store.dispatch({ type: 'SET_USER', payload })
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }
  public async editAvatar(formData: FormData) {
    try {
      const payload = await this.api.editAvatar(formData)
      store.dispatch({ type: 'SET_USER', payload })
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }
  public async editPassword(formData: FormData) {
    try {
      await this.api.editPassword(formData)
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }
  public async searchUser(formData: FormData) {
    try {
      await this.api.editAvatar(formData)
      // дописать
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }
}

export default UserController