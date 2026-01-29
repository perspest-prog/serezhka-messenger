import type Component from '../core/Component'
import { store, router, DEFAULT_AUTHORIZED_PAGE } from '../settings'

type ComponentProps<T extends new (props: any) => Component> = T extends new (props: infer U) => Component ? U : never

function withoutAuth<T extends new (props: any) => Component>(component: T) {
  return class extends component {
    constructor(props: ComponentProps<T>) {
      super({ ...props })
    }

    protected componentDidMount(): void {
      const { user } = store.getState()

      if (user) {
        router.redirect(DEFAULT_AUTHORIZED_PAGE)
      }
    }
  }
}

export default withoutAuth
