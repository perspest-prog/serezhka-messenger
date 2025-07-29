const Regulars = {
  first_name: /^[A-Z][a-zA-Z]{1,9}$/,
  second_name: /^[A-Z][a-zA-Z]{1,9}$/,
  email: /^[a-zA-Z0-9]+[a-zA-Z0-9.-_]*@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\w\W].{8,40}$/,
  phone: /^[0-9]{9,14}$/,
  login: /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/,
} as const

export const validate = (value: string, name: string): [string, boolean] => {
  if (!(name in Regulars)) {
    return ['', false]
  }

  const rule = Regulars[name as keyof typeof Regulars]

  if (rule.test(value)) {
    return ['', true]
  }

  let message = ''

  switch (name) {
    case "first_name":
      if (value[0] !== value[0].toUpperCase()) {
        message = "Первая буква должна быть заглавной"
      } else {
        message = 'Введите корректное имя'
      }
      break
    
    case "second_name":
      if (value[0] !== value[0].toUpperCase()) {
        message = "Первая буква должна быть заглавной"
      } else {
        message = 'Введите корректную фамилию'
      }
      break
    
    case "phone":
      if (value.length < 10 || value.length > 15) {
        message = 'Телефон должен содержать от 10 до 15 символов'
      } else {
        message = "Введите корректный телефон"
      }
      break

    case 'email':
      message = 'Введите корректный email'
      break

    case 'password':
      if (value.length < 8 || value.length > 40) {
        message = 'Пароль должен содержать от 8 до 40 символов'
      } else if (!/[a-z]/.test(value)) {
        message = 'Пароль должен содержать минимум одну маленькую букву'
      } else if (!/[A-Z]/.test(value)) {
        message = 'Пароль должен содержать минимум одну большую букву'
      } else if (!/[0-9]/.test(value)) {
        message = 'Пароль должен содержать минимум одну цифру'
      } else {
        message = 'Введите корректный пароль'
      }
      break

    case 'login':
      if (value.length < 3 || value.length > 20) {
        message = 'Логин должен содержать от 3 до 20 символов'
      } else {
        message = 'Введите корректный пароль'
      }
  }

  return [message, false]
}
