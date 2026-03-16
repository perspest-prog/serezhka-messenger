import Component, { type Props } from '../../core/Component'
import template from './template.hbs'
import classes from './styles.module.css'

interface ButtonProps extends Props {
  type: 'button' | 'submit' | 'reset'
  label: string
  isActive?: boolean
  isHidden?: boolean
  action? : void | (() =>  void) 
}

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ action: () => {}, isActive: true, isHidden: false, ...props, classes})
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  public changeActive() {
    this.state.isActive = !this.state.isActive
    this.state.label = !this.state.isActive ? 'Изменить данные' : "Сохранить"
    this.getContent().style.alignSelf = this.state.isActive ? 'center' : ''
  }
  public changeHidden() { 
    this.state.isHidden = !this.state.isHidden
  }
}

export default Button
