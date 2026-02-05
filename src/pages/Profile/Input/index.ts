import Component, { type Props } from '../../../core/Component'
import template from './template.hbs'
import classes from './style.module.css'
import { validate } from '../../../utils/validate'

interface InputProps extends Props {
  name: 'first_name' | 'second_name' | 'login' | 'email' | 'password' | 'phone' | "oldPassword" | "newPassword"
  type: string
  error: string
  labelValue: string
  value: string
  isFrozen: boolean
  isValid: boolean
  isHidden?: boolean
}

class Input extends Component<InputProps> {
  constructor(props: Omit<InputProps, 'error' | 'isFrozen' | 'value' | 'isValid'>) {
    super({value: '', isHidden: false, ...props, classes, error: '', isFrozen: true, isValid: true})
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }

  protected componentDidMount(): void {
    this.events.change = this.handlerChange.bind(this)
  }

  private handlerChange(event: Event) {
    console.log(this)
    this.state.value = event.target.value.trim()
    this.handlerFocusout.call(this)
  }

  public changeFrozen() {
    this.state.isFrozen = !this.state.isFrozen
  }
  public changeHidden() {
    this.state.isHidden = !this.state.isHidden
  }
  public handlerFocusout() {
    const [error, isValid] = validate(this.state.value, this.state.name)
    this.state.error = error
    this.state.isValid = isValid
    return isValid
  }
}

export default Input
