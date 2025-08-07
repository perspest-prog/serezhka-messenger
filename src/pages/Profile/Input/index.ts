import Component, {type Props} from "../../../core/Component";
import template from "./template.hbs"
import classes from "./style.module.css"

interface InputProps extends Props {
  name: "first_name" | "second_name" | "login" | "email" | "email" | "password" | "phone",
  type: string,
  error: string,
  labelValue: string,
  value: string,
  isFrozen: boolean
}

class Input extends Component<InputProps> {
  constructor(props: Omit<InputProps, "value" | "error" | "isFrozen">) {
    super({...props, classes, error: "", value: "", isFrozen: true})
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }

  protected componentDidMount(): void {
    this.events.change = this.handlerChange.bind(this)
  }

  private handlerChange(event: Event) {
    this.state.value = event.target.value.trim()
  }


  public changeFrozen() { 
    this.state.isFrozen = false
  }
}

export default Input