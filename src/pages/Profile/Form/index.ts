import Component, { type Props } from '../../../core/Component'
import Input from '../Input'
import template from './template.hbs'
import classes from './style.module.css'
import Button from '../../../components/Button'
import type Link from '../Link'
import connect from '../../../hocs/connect'
import { store, userController } from '../../../settings'

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

    if (store.getState().formVariant !== 'user') {
      store.dispatch({type: 'SET_FORMVARIANT', payload: 'user'})
    }
    this.children.inputs.forEach((input: Input) => input.changeFrozen())

    if (!this.children.buttons[0].state.isActive) {
      if (this.children.inputs.filter(input => ['first_name', 'second_name', 'login', 'email', 'password', 'phone'].includes(input.state.name)).every((input: Input) => input.handlerFocusout())) {
        const data = new FormData()
        this.children.inputs.forEach((input: Input) => data.append(input.state.name, input.state.value))
        userController.editUser.call(userController, data)
      }
    }
  }
  private handlerSecondButton() {
    this.children.link.changeHidden()
    this.children.buttons[0].changeHidden()
    
    if (store.getState().formVariant !== 'editPassword') {
      store.dispatch({type: 'SET_FORMVARIANT', payload: 'editPassword'})
      console.log(store.getState().formVariant)
    }
    else {
      store.dispatch({type: 'SET_FORMVARIANT', payload: 'user'})
    }
    
    this.children.inputs.forEach((input: Input) => {
      input.changeFrozen()
    })
    if (this.children.inputs.at(-1).state.isFrozen) {
        const data = new FormData()
        this.children.inputs.forEach((input: Input) => data.append(input.state.name, input.state.value))
        userController.editPassword.call(userController, data)
      }
  }


  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default connect(Form, ({user, formVariant}) => {
  if (formVariant === 'user') {
    return {
      inputs: [
        new Input({ name: 'email', type: 'text', labelValue: 'Почта', value: user?.email }),
        new Input({ name: 'login', type: 'text', labelValue: 'Логин', value: user?.login }),
        new Input({ name: 'first_name', type: 'text', labelValue: 'Имя', value: user?.first_name }),
        new Input({ name: 'second_name', type: 'text', labelValue: 'Фамилия', value: user?.second_name }),
        new Input({ name: 'phone', type: 'text', labelValue: 'Телефон', value: user?.phone }),
      ],
    }
  }
  else {
    return {
      inputs: [
        new Input({ name: 'oldPassword', type: 'password', labelValue: 'Старый пароль'}),
        new Input({ name: 'newPassword', type: 'password', labelValue: 'Новый пароль'}),
        new Input({ name: 'repeatNewPassword', type: 'password', labelValue: 'Повторите новый пароль'}),
      ],
    }
  }
})
