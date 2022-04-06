import * as yup from 'yup'

export const userSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  responsible: yup.string().required(),
})
