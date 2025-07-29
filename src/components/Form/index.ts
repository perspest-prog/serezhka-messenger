import template from "./template.hbs";
import Component, { type Props } from "../../core/Component";
import classes from "./styles.module.css"
import Input from "../Input";
import type Button from "../Button";

interface FormProps extends Props {
  action: (data: Record<string, string>) => void
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

  private handlerButton(ev: Event) {
    ev.preventDefault()

    if (this.children.inputs.every((input: Input) => input.handlerFocusout.call(input))) {
      const data = (this.children.inputs as Input[]).reduce((acc, { state }) => ({ ...acc, [state.name]: state.value}), {})

      this.state.action(data)
    }
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Form