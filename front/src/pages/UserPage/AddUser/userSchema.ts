import * as yup from 'yup'
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = yup.object({
  name: yup
    .string()
    .required('O nome é obrigatório')
    .min(4, 'Nome não atingiu o tamanho mínimo'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('O email é inválido'),
  telefone: yup
    .string()
    .max(11, 'O número de telefone é inválido')
    .min(8, 'O número de telefone é inválido')
    .matches(phoneRegExp, 'O número de telefone é inválido'),
  cargo: yup.string().required('O cargo é obrigatório'),
  password: yup.string().required('O cargo é obrigatório'),
})
