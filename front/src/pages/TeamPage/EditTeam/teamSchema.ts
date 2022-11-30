import * as yup from 'yup'

export const teamSchema = yup.object({
  team_name: yup.string().required(),
  sector: yup.string().required(),
})
