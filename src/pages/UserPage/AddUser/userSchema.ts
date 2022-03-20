import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required("O nome é obrigatório").min(4, "Nome não atingiu o tamanho mínimo"),
    email: yup.string().required("O email é obrigatório").email("O email é inválido")
})