import AuthApi from "../../core/API/AuthApi";
import { DEFAULT_AUTHORIZED_PAGE, router, store } from "../../core/settings";

class AuthCoontroller {
  private api = new AuthApi()

  constructor() {

  }

  public async getUser() {
    try {
      const payload = await this.api.fetchUser()
      store.dispatch({type: 'SET_USER', payload})
    }
    catch (error) {
      const typeError = error as {name: string, message: string}
      store.dispatch({type: 'SET_ERROR', payload: typeError})
    }
  }
  public async signin(formData: FormData) {
    try {
      await this.api.signin(formData)
      await this.getUser()
      router.redirect(DEFAULT_AUTHORIZED_PAGE)
    }
    catch (error) {
      console.log(error)
      const typeError = error as {name: string, message: string}
      store.dispatch({type: 'SET_ERROR', payload: typeError})
    }
  }
  public async signup(formData: FormData) {
    try {
      console.log(this)
      await this.api.signup(formData)
      await this.getUser()
      router.redirect(DEFAULT_AUTHORIZED_PAGE)
    }
    catch (error) {
      const typeError = error as {name: string, message: string}
      store.dispatch({type: 'SET_ERROR', payload: typeError})
    }
  }
  public async logout() {
    try {
      await this.api.logout()
      window.location.reload()
    }
    catch (error) {
      const typeError = error as {name: string, message: string}
      store.dispatch({type: 'SET_ERROR', payload: typeError})
    }
  }
}

export default AuthCoontroller;