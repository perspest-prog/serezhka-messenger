import Component from '../core/Component'
import { store, type AppState } from '../settings'

type ComponentProps<T extends new (props: any) => Component> = T extends new (props: infer U) => Component ? U : never

function connect<T extends new (props: any) => Component>(className: T, selector: (state: AppState) => Partial<ComponentProps<T>>) {
  return class extends className {
    constructor(props: ComponentProps<T>) {
      super({ ...props, ...selector(store.getState()) })

      store.on('update', () => {
        const data = selector(store.getState())
        const { state, children } = Component.getStateAndChildren(data)

        Object.assign(this.state, state)
        Object.assign(this.children, children)
      })
    }
  }
}

export default connect
