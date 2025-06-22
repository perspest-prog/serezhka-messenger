type State<P> = any
type Children<P> = any
interface Props {}

abstract class Component<P extends Props> {
  protected state: State<P>
  protected children: Children<P>

  constructor(props: P) {
    const {children, state} = Component.getStateAndChildren(props)
    this.children = children
    this.state = state
  }

  private static getStateAndChildren<P extends Props>(props: P) {
    const state = {} as State<P>
    const children = {} as Children<P>
    for (const key in props) {
      if (props[key] instanceof Component || Array.isArray(props[key]) && props[key].every((prop)=> prop instanceof Component)) {
        children[key] = props[key]
      }
      else {
        state[key] = props[key]
      }
    }
    return {children, state}
  }
}

export default Component