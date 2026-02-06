import Component, { type Props } from '../../../core/Component'
import Input from '../Input'
import template from './template.hbs'
import classes from './style.module.css'
import Button from '../../../components/Button'
import type Link from '../Link'
import connect from '../../../hocs/connect'
import { userController } from '../../../settings'

interface FormProps extends Props {
  inputs: Array<Input>
  buttons: Array<Button>
  link: Link
}

class Form extends Component<FormProps> {
  constructor(props: FormProps) {
    super({ ...props, classes })
  }

  protected componentDidMount(): void {
    this.children.buttons.forEach((button: Button, index) => {
      if (index === 0)  {
        button.events.click = this.handlerFirstButton.bind(this)
      }
      else if (index === 1) {
        button.events.click = this.handlerSecondButton.bind(this)
      }
    })
  }
  private handlerFirstButton() {
    this.children.buttons[0].changeActive()
    this.children.buttons[1].changeHidden()
    this.children.link.changeHidden()

    this.children.inputs.forEach((input: Input) => input.changeFrozen())

    if (!this.children.buttons[0].state.isActive) {
      if (this.children.inputs.filter(input => ['first_name', 'second_name', 'login', 'email', 'password', 'phone'].includes(input.state.name)).every((input: Input) => input.handlerFocusout())) {
        const data = new FormData()
        this.children.inputs.forEach((input: Input) => data.append(input.state.name, input.state.value))
        data.delete('newPassword')
        data.delete('oldPassword')
        data.delete('repeatNewPassword')
        userController.editUser.call(userController, data)
      }
    }
  }
  private handlerSecondButton() {
    this.children.link.changeHidden()
    this.children.buttons[0].changeHidden()

    const data = new FormData()
    this.children.inputs.forEach((input: Input) => {
      input.changeFrozen()
      input.changeHidden()
    })
    if (this.children.inputs.at(-1).state.isFrozen) {
        this.children.inputs.forEach((input: Input) => data.append(input.state.name, input.state.value))
        data.delete('repeatNewPassword')
        data.delete('first_name')
        data.delete('second_name')
        data.delete('login')
        data.delete('email')
        data.delete('phone')
        userController.editPassword.call(userController, data)
      }
  }

 

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default connect(Form, ({ user }) => {
  return {
    inputs: [
      new Input({ name: 'email', type: 'text', labelValue: 'Почта', value: user?.email }),
      new Input({ name: 'login', type: 'text', labelValue: 'Логин', value: user?.login }),
      new Input({ name: 'first_name', type: 'text', labelValue: 'Имя', value: user?.first_name }),
      new Input({ name: 'second_name', type: 'text', labelValue: 'Фамилия', value: user?.second_name }),
      new Input({ name: 'phone', type: 'text', labelValue: 'Телефон', value: user?.phone }),
      new Input({ name: 'oldPassword', type: 'password', labelValue: 'Старый пароль', isHidden: true }),
      new Input({ name: 'newPassword', type: 'password', labelValue: 'Новый пароль', isHidden: true }),
      new Input({ name: 'repeatNewPassword', type: 'password', labelValue: 'Повторите новый пароль', isHidden: true }),
    ],
  }
})
