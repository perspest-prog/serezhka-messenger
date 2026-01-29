import Component, {type Props} from "../../core/Component";
import template from "./template.hbs"
import Input from "./Input";
import Button from "../../components/Button";
import Form from "./Form"
import classes from "./style.module.css"
import withAuth from "../../utils/HOC/withAuth";

interface ProfileProps extends Props {
  form: Form
}

class Profile extends Component<ProfileProps> {
  constructor() {
    super(
      {
        form: new Form(
        {
          inputs:
          [
            new Input({name: "email", type: "text", labelValue: "Почта"}),
            new Input({name: "login", type: "text", labelValue: "Логин"}),
            new Input({name: "first_name", type: "text", labelValue: "Имя"}),
            new Input({name: "second_name", type: "text", labelValue: "Фамилия"}),
            new Input({name: "phone", type: "text", labelValue: "Телефон"}),
          ],
          buttons: 
          [
            new Button({type: 'button', label: 'Изменить данные'}),
            new Button({type: 'button', label: 'Изменить пароль'}),
            new Button({type: 'button', label: 'Выйти'})
          ]
        }
      ), classes
      }
    )
  }

  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  
}

export default withAuth(Profile);