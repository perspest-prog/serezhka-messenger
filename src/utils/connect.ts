import Component from "../core/Component"
import type { State } from "../core/Store"
import Store from "../core/Store"

type ComponentProps<T extends new (props: Record<string, unknown>) => Component> = 
  T extends new (props: infer U) => Component ? U : never


function connect<T extends new (props: Record<string, unknown>) => Component>(className: T, selector: (state: State) => Partial<ComponentProps<T>>) {
  return class extends className {
    constructor(props: ComponentProps<T>) {
      const store = new Store()
      super({...props, ...selector(store.getState())})
      store.on('update', () => {
        const data = selector(store.getState())
        const {state, children} = Component.getStateAndChildren(data)
        Object.assign(this.state, state)
        Object.assign(this.children, children)
      })
    }
  }
}

export default connect