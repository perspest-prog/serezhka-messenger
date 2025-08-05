import template from "./template.hbs"
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Component, { type Props } from "../../core/Component";
import Link from "../../components/Link";

interface RegistrationProps extends Props {
  form: Form
}

class Registration extends Component<RegistrationProps> {
  constructor() {
    super({form: new Form(
  {
    value: "Регистрация",
    inputs:
    [
      new Input({name: "email", type: "text", labelValue: "Почта"}),
      new Input({name: "login", type: "text", labelValue: "Логин"}),
      new Input({name: "first_name", type: "text", labelValue: "Имя"}),
      new Input({name: "second_name", type: "text", labelValue: "Фамилия"}),
      new Input({name: "phone", type: "text", labelValue: "Телефон"}),
      new Input({name: "password", type: "password", labelValue: "Пароль"}),
    ],
    button: new Button(
      {
        type: 'submit',
        label: 'Зарегистрироваться'
      }
    ),
    link: new Link(
      {
        path: '/auth',
        value: 'Войти'
      }
    ),
    action: console.log
  }
)})
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
}

export default Registration