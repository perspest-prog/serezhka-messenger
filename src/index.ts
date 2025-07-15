import Button from "./components/Button"
import Input from "./components/Input"
import Form from "./components/Form"

const form = new Form(
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
    )
  }
)
document.body.append(form.getContent())
form.dispatchComponentDidMount()