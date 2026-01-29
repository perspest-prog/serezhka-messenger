import template from "./template.hbs";
import Component, { type Props } from "../../core/Component";
import classes from "./styles.module.css"
import Input from "../Input";
import type Button from "../Button";
import Link from "../Link";

interface FormProps extends Props {
  action: (data: FormData) => void
  inputs: Array<Input>,
  button?: Button,
  link: Link,
  value: string
}

class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super({...props, classes})
  }

  protected componentDidMount(): void {
    this.children.button.events.click = this.handlerButton.bind(this)
  }

  private handlerButton(ev: Event) {
    ev.preventDefault()
    
    const data = new FormData()
    if (this.children.inputs.every((input: Input) => input.handlerFocusout.call(input))) {
      this.children.inputs.forEach((input: Input) => data.append(input.state.name, input.state.value))

      this.state.action(data)
    }
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Form;