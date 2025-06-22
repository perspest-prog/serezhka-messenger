import EventBus from './EventBus' 

type State<P> = any
type Children<P> = any

interface Props {}

enum PHASES {
  MOUNT,
  UPDATE,
  UNMOUNT
}

abstract class Component<P extends Props> {
  private callEventBus = new EventBus()
  
  protected state: State<P>
  protected children: Children<P>

  constructor(props: P) {
    const { state, children } = Component.getStateAndChildren(props)
    
    this.state = state
    this.children = children

    this.callEventBus.on(PHASES.MOUNT, this._componentDidMount)
    this.callEventBus.on(PHASES.UPDATE, this._componentDidUpdate)
    this.callEventBus.on(PHASES.UNMOUNT, this._componentWillUnmount)
  }
  
  private static getStateAndChildren<P extends Props>(props: P) {
    const state = {} as State<P>
    const children = {} as Children<P>
    
    for (const key in props) {
      const value = props[key]
      
      if (value instanceof Component || Array.isArray(value) && value.every((prop) => prop instanceof Component)) {
        children[key] = value
      } else {
        state[key] = value
      }
    }
    
    return { state, children }
  }
  protected componentDidMount() {

  }
  protected componentDidUpdate() {

  }
  protected componentWillUnmount() {

  }
  private _componentDidMount() {

  }
  private _componentDidUpdate() {
  }
  private _componentWillUnmount() {

  }
}

export default Component
