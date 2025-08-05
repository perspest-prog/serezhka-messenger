import Registration from "./pages/Registration"
import Authorisation from "./pages/Authorisation"
import Router from "./core/Router"
import "./styles.css"

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement

const route = new Router(rootElement)

route
  .use('/signup', new Registration())
  .use('/auth', new Authorisation())
  .start()

export default route