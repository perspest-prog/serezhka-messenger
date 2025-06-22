import EventBus from './EventBus' 

type State<P> = any
type Children<P> = any

interface Props {}

abstract class Component<P extends Props> {
  protected state: State<P>
  protected children: Children<P>

  constructor(props: P) {
    const { state, children } = Component.getStateAndChildren(props)
    
    this.state = state
    this.children = children
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
}

export default Component
