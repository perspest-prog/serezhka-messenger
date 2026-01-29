import Component, { type Props } from '../../core/Component'
import Button from '../../components/Button'
import Form from '../../components/Form'
import Input from '../../components/Input'
import Link from '../../components/Link'
import template from './template.hbs'
import classes from './styles.module.css'
import { authController } from '../../settings'
import withoutAuth from '../../hocs/withoutAuth'

interface RegistrationProps extends Props {
  form: Form
}

class Registration extends Component<RegistrationProps> {
  constructor() {
    super({
      form: new Form({
        value: 'Регистрация',
        inputs: [
          new Input({ name: 'email', type: 'text', labelValue: 'Почта' }),
          new Input({ name: 'login', type: 'text', labelValue: 'Логин' }),
          new Input({ name: 'first_name', type: 'text', labelValue: 'Имя' }),
          new Input({ name: 'second_name', type: 'text', labelValue: 'Фамилия' }),
          new Input({ name: 'phone', type: 'text', labelValue: 'Телефон' }),
          new Input({ name: 'password', type: 'password', labelValue: 'Пароль' }),
        ],
        button: new Button({
          type: 'submit',
          label: 'Зарегистрироваться',
        }),
        link: new Link({
          path: '/auth',
          value: 'Войти',
        }),
        action: authController.signup.bind(authController),
      }),
      classes,
    })
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default withoutAuth(Registration)
