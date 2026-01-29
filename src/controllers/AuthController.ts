import { AuthAPI } from '../API'
import { DEFAULT_AUTHORIZED_PAGE, router, store } from '../settings'

class AuthController {
  private api = new AuthAPI()

  constructor() {}

  public async getUser() {
    try {
      const payload = await this.api.fetchUser()

      store.dispatch({ type: 'SET_USER', payload })
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }

  public async signin(data: FormData) {
    try {
      await this.api.signin(data)

      await this.getUser()

      router.redirect(DEFAULT_AUTHORIZED_PAGE)
    } catch (error) {
      console.log(error)
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }

  public async signup(data: FormData) {
    try {
      await this.api.signup(data)

      await this.getUser()

      router.redirect(DEFAULT_AUTHORIZED_PAGE)
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }

  public async logout() {
    try {
      await this.api.logout()

      window.location.reload()
    } catch (error) {
      const typeError = error as { name: string; message: string }
      store.dispatch({ type: 'SET_ERROR', payload: typeError })
    }
  }
}

export default AuthController
