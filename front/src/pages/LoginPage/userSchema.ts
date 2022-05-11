import * as yup from 'yup'

export const userSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
})
