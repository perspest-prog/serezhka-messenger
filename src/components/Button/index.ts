import Component, { type Props } from "../../core/Component";
import template from "./template.hbs"
import classes from "./styles.module.css"

interface ButtonProps extends Props {
  type: "button" | "submit" | "reset",
  label: string,
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({...props, classes})
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Button