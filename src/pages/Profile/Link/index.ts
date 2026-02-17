import template from './template.hbs'
import Component, { type Props } from '../../../core/Component'
import classes from './styles.module.css'
import { router } from '../../../settings'

interface LinkProps extends Props {
  path: string
  value: string
  action: () => void
  isHidden?: boolean
}

class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({isHidden: false, ...props, classes })
  }
  protected componentDidMount(): void {
    this.events.click = this.handler.bind(this)
  }
  private handler(event: Event) {
    event.preventDefault()
    this.state.action()
    router.navigate(this.state.path)
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  public changeHidden() {
    this.state.isHidden = !this.state.isHidden
  }
}

export default Link
