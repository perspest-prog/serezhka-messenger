import Registration from "./pages/Registration"
import Authorisation from "./pages/Authorisation"
import Profile from "./pages/Profile"
import Router from "./core/Router"
import "./styles.css"

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement

const route = new Router(rootElement)

route
  .use('/signup', new Registration())
  .use('/auth', new Authorisation())
  .use('/profile', new Profile())
  .start()

export default route