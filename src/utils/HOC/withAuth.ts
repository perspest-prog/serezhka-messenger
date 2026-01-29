import Component from "../../core/Component";
import { router, store } from "../../core/settings";
import { DEFAULT_UNAUTHORIZED_PAGE } from "../../core/settings";

type ComponentProps<T extends new (props: any) => Component> = 
  T extends new (props: infer U) => Component ? U : never

function withAuth<T extends new (props: any) => Component>(className: T) {
  return class extends className {
    constructor(props: ComponentProps<T>) {
      super({...props})
    }
    protected componentDidMount(): void {
      if (!store.getState().user) {
        router.redirect(DEFAULT_UNAUTHORIZED_PAGE)
      }
    }
  }
}

export default withAuth;