import template from "./template.hbs"
import Component, { type Props } from "../../core/Component";
import classes from "./styles.module.css"
import { router } from "../../core/settings";

interface LinkProps extends Props {
  path: string,
  value: string,
}

class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({...props, classes})
  }
  protected componentDidMount(): void {
    this.events.click = this.handler.bind(this)
  }
  private handler(event: Event) {
    event.preventDefault()
  
    router.navigate(this.state.path)
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Link