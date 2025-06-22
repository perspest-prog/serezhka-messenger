import EventBus from './EventBus' 

type State<P> = any
type Children<P> = any

interface Props {callEventBus: any}

enum Methods {
  'didMount' = 'didMount',
  'DidUpdate' = 'didUpdate',
  'WillUnmount' = 'WillUnmount'
}

abstract class Component<P extends Props> {
  protected state: State<P>
  protected children: Children<P>
  callEventBus = new EventBus()

  constructor(props: P) {
    const { state, children } = Component.getStateAndChildren(props)
    
    this.state = state
    this.children = children
    
    this.callEventBus.on(Methods.didMount, this._componentDidMount)
    this.callEventBus.on(Methods.DidUpdate, this._componentDidUpdate)
    this.callEventBus.on(Methods.WillUnmount, this._componentWillUnmount)
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
  protected componentDidMount<P extends Props>() {

  }
  protected componentDidUpdate<P extends Props>() {

  }
  protected componentWillUnmount<P extends Props>() {

  }
  private _componentDidMount<P extends Props>() {

  }
  private _componentDidUpdate<P extends Props>() {
  }
  private _componentWillUnmount<P extends Props>() {

  }
}

export default Component
