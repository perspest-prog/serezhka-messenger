import Component, { type Props } from '../../core/Component'
import template from './template.hbs'
import classes from './styles.module.css'
import { validate } from '../../utils/validate'

interface InputProps extends Props {
  name: 'first_name' | 'second_name' | 'login' | 'email' | 'email' | 'password' | 'phone' | 'avatar'
  type: string
  error: string
  labelValue: string
  value: string
  isValid: boolean
  isAvatar?: boolean
}

class Input extends Component<InputProps> {
  constructor(props: Omit<InputProps, 'value' | 'error' | 'isValid'>) {
    super({isAvatar: false, ...props, classes, value: '', error: '', isValid: true })
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  protected componentDidMount(): void {
    this.events.change = this.handlerChange.bind(this)
  }
  private handlerChange(event: Event & { target: HTMLInputElement }) {
    if (this.state.name !== 'avatar') {
      this.state.value = event.target.value.trim()
      this.handlerFocusout.call(this)
    }
  }
  public handlerFocusout() {
    const [error, isValid] = validate(this.state.name, this.state.value)
    this.state.error = error
    this.state.isValid = isValid
    return isValid
  }
  
}

export default Input
