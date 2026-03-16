import Component, { type Props } from '../../core/Component'
import template from './template.hbs'
import Input from './Input'
import ModalInput from '../../components/Input'
import ChangeAvatar from './Button'
import Button from '../../components/Button'
import Form from './Form'
import classes from './styles.module.css'
import withAuth from '../../hocs/withAuth'
import Link from './Link'
import { authController } from '../../settings'
import Modal from '../../components/Modal'

interface ProfileProps extends Props {
  form: Form
  avatar: ChangeAvatar
  modal: Modal
}

class Profile extends Component<ProfileProps> {
  constructor() {
    super({
      avatar: new ChangeAvatar({avatarUrl: ''}),
      form: new Form({
        inputs: [
          new Input({ name: 'email', type: 'text', labelValue: 'Почта' }),
          new Input({ name: 'login', type: 'text', labelValue: 'Логин' }),
          new Input({ name: 'first_name', type: 'text', labelValue: 'Имя' }),
          new Input({ name: 'second_name', type: 'text', labelValue: 'Фамилия' }),
          new Input({ name: 'phone', type: 'text', labelValue: 'Телефон' }),
          new Input({ name: 'oldPassword', type: 'text', labelValue: 'Старый пароль' }),
          new Input({ name: 'newPassword', type: 'text', labelValue: 'Новый пароль' }),
          new Input({ name: 'repeatNewPassword', type: 'text', labelValue: 'Повторите новый пароль' }),
        ],
        buttons: [
          new Button({ type: 'button', label: 'Изменить данные', isActive: false }),
          new Button({ type: 'button', label: 'Изменить пароль', isActive: false }),
        ],
        link: new Link({ path: '/auth', value: 'Выйти', action: authController.logout.bind(authController) })
      }),
      modal: new Modal({title: 'Загрузите файл', inputs: [new ModalInput({name: 'avatar', type: 'file', labelValue: '', isAvatar: true})], button: new Button({type: 'button', label: 'Поменять'}), openModal: false }),
      classes,
    })
    this.children.avatar.events.click = () => this.children.modal.state.openModal = !this.children.modal.state.openModal
  }

  protected componentDidMount(): void {
    
  }


  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default withAuth(Profile)
