const Regulars = {
  first_name: /^[A-Z][a-zA-Z]{1,9}$/,
  second_name: /^[A-Z][a-zA-Z]{1,9}$/,
  email: /^[a-zA-Z0-9]+[a-zA-Z0-9.-_]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w\W].{8,40}$/,
  phone: /^\*[0-9]{9,14}$/,
  login: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/,
} as const

export const validate = (state: Record<any, any>) => {
  let {value, name} = state
  value = value.trim()
  switch (name) {
    case "first_name":
      const firstName = new RegExp(Regulars.first_name)
      if (!firstName.test(value)) {
        if (value[0] !== value[0].toUpperCase()) {
          return ["Первая буква должна быть заглавной", false]
        }
        return ['Введите корректное имя', false]
      }
      return ['', true]
    
    case "second_name":
      const secondName = new RegExp(Regulars.second_name)
      if (!secondName.test(value)) {
        
        if (value[0] !== value[0].toUpperCase()) {
          return ["Первая буква должна быть заглавной", false]
        }
      return ['', true]
    }
    case "phone":
      const phone = new RegExp(Regulars.phone)
      value = value.replace(/\s/g, '').replace('+', '')
      if (!phone.test(value)) {
        if (value.length < 10 || value.length > 15) {
          return ['Телефон должен содержать от 10 до 15 символов', false]
        }
      }
      return ['', true]

    case 'email':
      const email = new RegExp(Regulars.email)
      if (!email.test(value)) {
        return ['Введите корректный email', false]
      }
      return ['', true]

    case 'password':
      const password = new RegExp(Regulars.password)
      if (!password.test(value)) {
        if (value.length < 8 || value.length > 40) {
          return ['Пароль должен содержать от 8 до 40 символов', false]
        }
        if (value.length < 8 || value.length > 40) {
          return ['Пароль должен содержать от 8 до 40 символов', false];
        }
        if (!/[a-z]/.test(value)) {
          return ['Пароль должен содержать минимум одну маленькую букву', false];
        }
        if (!/[A-Z]/.test(value)) {
          return ['Пароль должен содержать минимум одну большую букву', false];
        }
        if (!/[0-9]/.test(value)) {
          return ['Пароль должен содержать минимум одну цифру', false];
        }
        else {
          return ['Введите корректный пароль', false]
        }
      }
      return ['', true]
    

    case 'login':
      const login = new RegExp(Regulars.login)
      if (!login.test(value)) {
        if (value.length < 3 || value.length > 20) {
          return ['Логин должен содержать от 3 до 20 символов', false]
        }
        return ['Введите корректный пароль', false]
      }
      return ['', true]
  }
}
