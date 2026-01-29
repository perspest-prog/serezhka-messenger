import type Component from './Component'

class Router {
  private container!: Node
  private currentPage: Component | null = null
  private routes = new Map<string, Component>()

  constructor(container?: Node) {
    this.container = container!
  }

  private onRoute() {
    const route = this.routes.get(window.location.pathname)
    if (!route) {
      throw new Error()
    } else {
      if (this.currentPage) {
        this.currentPage.dispatchComponentWillUmnout()
        this.container.removeChild(this.currentPage.getContent())
      }
      this.currentPage = route

      this.container.appendChild(route.getContent())
      route.dispatchComponentDidMount()
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
    this.routes.set(pathname, new page())

    return this
  }

  public start() {
    window.addEventListener('popstate', this.onRoute.bind(this))
    this.onRoute()
  }
}

export default Router
