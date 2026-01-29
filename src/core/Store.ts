import EventBus from './EventBus'

class Store<S, A> extends EventBus {
  private state: S
  private reducer: (previos: S, action: A) => S

  constructor(initalState: S, reducer: (previous: S, action: A) => S) {
    super()

    this.state = initalState
    this.reducer = reducer
  }

  public getState() {
    return this.state
  }

  public dispatch(action: A) {
    this.state = this.reducer(this.state, action)
    this.emit('update')
  }
}

export default Store
