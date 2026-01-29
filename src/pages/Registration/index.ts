import Component, { type Props } from "../../core/Component";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Link from "../../components/Link";
import template from "./template.hbs";
import classes from "./styles.module.css";
import withoutAuth from "../../utils/HOC/withoutAuth";
import { AuthController } from "../../core/settings";

interface RegistrationProps extends Props {
  form: Form;
}

class Registration extends Component<RegistrationProps> {
  constructor() {
    super({
      form: new Form({
        value: "Регистрация",
        inputs: [
          new Input({ name: "email", type: "text", labelValue: "Почта", value: "bargansergei333@gmai.com"}),
          new Input({ name: "login", type: "text", labelValue: "Логин", value: "Sergei1"}),
          new Input({ name: "first_name", type: "text", labelValue: "Имя", value: "Sergei"}),
          new Input({ name: "second_name", type: "text", labelValue: "Фамилия", value: "Bargan"}),
          new Input({ name: "phone", type: "text", labelValue: "Телефон", value: "89254413720"}),
          new Input({ name: "password", type: "password", labelValue: "Пароль", value: "FREEstyle1"}),
        ],
        button: new Button({
          type: "submit",
          label: "Зарегистрироваться",
        }),
        link: new Link({
          path: "/auth",
          value: "Войти",
        }),
        action: AuthController.signup.bind(AuthController),
      }),
      classes,
    });
  }

  protected render(): Handlebars.TemplateDelegate {
    return template;
  }
}

export default withoutAuth(Registration);