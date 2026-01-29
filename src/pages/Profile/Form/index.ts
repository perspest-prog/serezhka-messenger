import Component, { type Props } from '../../../core/Component'
import type Input from '../Input'
import template from './template.hbs'
import classes from './style.module.css'
import Button from '../../../components/Button'

interface FormProps extends Props {
  inputs: Array<Input>
  buttons: Array<Button>
}

class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super({ ...props, classes })
  }

  protected componentDidMount(): void {
    this.children.buttons.forEach((button: Button) => {
      button.events.click = this.handlerInput.bind(this)
    })
  }
  public handlerInput() {
    this.children.inputs.forEach((input: Input) => input.changeFrozen())
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Form
