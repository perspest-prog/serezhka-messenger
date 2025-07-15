import template from "./template.hbs";
import Component, { type Props } from "../../core/Component";
import classes from "./styles.module.css"
import Input from "../Input";
import type Button from "../Button";
import { validate } from "../../utils/validate";

interface FormProps extends Props {
  inputs: Array<Input>,
  button: Button,
  value: string
}

class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super({...props, classes})
  }

  protected componentDidMount(): void {
    this.children.button.events.click = this.handlerButton.bind(this)
  }

  private handlerButton(el: Event) {
    el.preventDefault()
    const obj: Record<string, string> = {}
    if (this.children.inputs.every((input: Input) => input.handlerFocusout.call(input))) {
      this.children.inputs.forEach((input: Input) => {
        obj[input.state.name] = input.state.value
      })
      console.log(obj)
    }
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Form