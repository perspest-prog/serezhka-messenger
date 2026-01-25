import EventBus from "./EventBus";

type State = object

interface Action {
  type: string,
  payload: State
}


class Store extends EventBus {
  private static instance: Store
  private state!: State
  constructor(state: State = {}) {
    if (Store.instance) {
      return Store.instance
    }
    super()
    this.state = state

    Store.instance = this
  }

  public getState() {
    return this.state
  }

  public dispatch(action: Action) {
    this.state = action.payload
    this.emit('update')
  }
}

export default Store
export type { State }