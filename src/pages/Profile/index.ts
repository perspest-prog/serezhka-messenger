import Component, { type Props } from '../../core/Component'
import template from './template.hbs'
import Input from './Input'
import Button from '../../components/Button'
import Form from './Form'
import classes from './style.module.css'
import withAuth from '../../hocs/withAuth'
import Link from './Link'
import { authController } from '../../settings'
interface ProfileProps extends Props {
  form: Form
}

class Profile extends Component<ProfileProps> {
  constructor() {
    super({
      form: new Form({
        inputs: [
          new Input({ name: 'email', type: 'text', labelValue: 'Почта' }),
          new Input({ name: 'login', type: 'text', labelValue: 'Логин' }),
          new Input({ name: 'first_name', type: 'text', labelValue: 'Имя' }),
          new Input({ name: 'second_name', type: 'text', labelValue: 'Фамилия' }),
          new Input({ name: 'phone', type: 'text', labelValue: 'Телефон' }),
          new Input({ name: 'oldPassword', type: 'text', labelValue: 'Старый пароль', isHidden: true }),
          new Input({ name: 'newPassword', type: 'text', labelValue: 'Новый пароль', isHidden: true }),
          new Input({ name: 'repeatNewPassword', type: 'text', labelValue: 'Повторите новый пароль', isHidden: true }),
        ],
        buttons: [
          new Button({ type: 'button', label: 'Изменить данные', isActive: false }),
          new Button({ type: 'button', label: 'Изменить пароль', isActive: false }),
        ],
        link: new Link({ path: '/auth', value: 'Выйти', action: authController.logout.bind(authController) })
      }),
      classes,
    })
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default withAuth(Profile)
