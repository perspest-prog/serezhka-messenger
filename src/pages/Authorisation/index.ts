import Component, { type Props } from "../../core/Component";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Link from "../../components/Link";
import template from "./template.hbs"

interface RegistrationProps extends Props {
  form: Form
}

class Authorisation extends Component<RegistrationProps> {
  constructor() {
    super({form: new Form(
  {
    value: "Вход",
    inputs:
    [
      new Input({name: "login", type: "text", labelValue: "Логин"}),
      new Input({name: "password", type: "password", labelValue: "Пароль"}),
    ],
    button: new Button(
      {
        type: 'submit',
        label: 'Авторизоваться'
      }
    ),
    link: new Link(
      {
        path: '/signup',
        value: 'Нет аккаунта?'
      }
    ),
    action: console.log
  }
      )
    })
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Authorisation