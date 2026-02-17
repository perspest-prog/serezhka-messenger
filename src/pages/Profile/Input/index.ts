import Component, { type Props } from '../../../core/Component'
import template from './template.hbs'
import classes from './styles.module.css'
import { validate } from '../../../utils/validate'

interface InputProps extends Props {
  name: 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | "oldPassword" | "newPassword" | 'repeatNewPassword' | 'avatar'
  type: 'text' | 'password' | 'file' | 'button'
  error: string
  labelValue: string
  value?: string
  isFrozen: boolean
  isValid: boolean
}

class Input extends Component<InputProps> {
  constructor(props: Omit<InputProps, 'error' | 'isFrozen' | 'isValid'>) {
    super({value: '', ...props, classes, error: '', isFrozen: true, isValid: true})
    this.events.change = this.handlerChange.bind(this)
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }

  protected componentDidMount(): void {
  }

  private handlerChange(event: Event) {
    this.state.value = event.target.value.trim()
    console.log(this.state.value)
    this.handlerFocusout.call(this)
  }

  public changeFrozen() {
    this.state.isFrozen = !this.state.isFrozen
  }

  public handlerFocusout() {
    const [error, isValid] = validate(this.state.name, this.state.value)
    this.state.error = error
    this.state.isValid = isValid
    return isValid
  }
}

export default Input
