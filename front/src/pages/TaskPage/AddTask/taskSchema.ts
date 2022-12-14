import * as yup from 'yup'

export const taskSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  color: yup.string().required(),
  person_id: yup.string().required(),
  status: yup.string(),
})
