import template from "./template.hbs"
import Component, { type Props } from "../../core/Component";
import classes from "./style.module.css"
import { validate } from "../../utils/validate";

interface InputProps extends Props{
  name: "first_name" | "second_name" | "login" | "email" | "email" | "password" | "phone",
  type: string,
  error: string,
  labelValue: string,
  value: string,
  isValid: boolean 
}

class Input extends Component<InputProps> {
  constructor(props: Omit<InputProps, "value" | "error" | "isValid">) {
    super({...props, classes, value: "", error: "", isValid: true})
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  protected componentDidMount(): void {
    this.events.change = this.handlerChange.bind(this)
  }
  private handlerChange(event: Event) {
    this.state.value = event.target.value.trim()
    this.handlerFocusout()
  }
  public handlerFocusout() {
    const [error, isValid] = validate(this.state.value, this.state.name)
    this.state.error = error
    this.state.isValid = isValid
    return isValid
  }
}

export default Input
