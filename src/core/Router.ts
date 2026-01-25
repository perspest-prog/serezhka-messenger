import type Component from "./Component"

class Router {
  private static instance: Router | null = null

  private container!: Node
  private currentPage: Component | null = null
  private routes = new Map<string, Component>()


  constructor(container?: Node) {
    if (Router.instance) {
      return Router.instance
    }
        
    this.container = container!

    Router.instance = this
  }

  private onRoute() {
    const route = this.routes.get(window.location.pathname)

    if (!route) {
        throw new Error
    } else {
        if (this.currentPage) {
            this.currentPage.dispatchComponentWillUmnout()
            this.container.removeChild(this.currentPage.getContent())
        }

        this.container.appendChild(route.getContent())
        route.dispatchComponentDidMount()

        this.currentPage = route
    }
  }

  public navigate(pathname: string) {
    window.history.pushState(null, '', pathname)

    this.onRoute()
  }

  public redirect(pathname: string) {
    window.history.replaceState(null, '', pathname)

    this.onRoute()
  }

  public use(pathname: string, page: new () => Component) {
    this.routes.set(pathname, new page)

    return this
  }

  public start() {
    window.addEventListener("popstate", this.onRoute.bind(this))
    this.onRoute()
  }
}

export default Router