import Component, { type Props } from '../../../core/Component'
import template from './template.hbs'
import classes from './styles.module.css'
import { BASE_URL, store } from '../../../settings'
import connect from '../../../hocs/connect'

interface ButtonProps extends Props {
  hasAvatar: boolean
  avatarUrl: string
}

class Button extends Component<ButtonProps> {
  constructor(props: Omit<ButtonProps, 'hasAvatar'>) {
    super({ ...props, classes, hasAvatar: false, avatarUrl: ''})
  }

  protected componentDidMount(): void {
    if (store.getState().user?.avatar) {
      this.state.hasAvatar = true
      this.state.avatarUrl = BASE_URL + store.getState()!.user!.avatar
    }
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default connect(Button, (data) => {
  return {
    hasAvatar: true,
    avatarUrl: BASE_URL + data!.user?.avatar
  }
})
