import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { Link } from 'react-router-dom'

export function AddUser() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
    })

    function onSubmit(values: any) {
        alert(JSON.stringify(values, null, 2))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>Cadastro de usuários</div>
            <div style={{ display: "flex" }}>
                <FormControl isInvalid={errors.name} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='name'>Nome</FormLabel>
                    <Input
                        id='name'
                        placeholder='Insira o nome'
                        {...register("name")}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.email} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        placeholder='Insira o email'
                        {...register("email")}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div style={{ display: "flex" }}>
                <FormControl isInvalid={errors.telefone} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='telefone'>Telefone</FormLabel>
                    <Input
                        id='telefone'
                        type='number'
                        placeholder='Insira o telefone'
                        {...register("telefone")}
                    />
                    <FormErrorMessage>
                        {errors.telefone && errors.telefone.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.cargo} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='cargo'>Cargo</FormLabel>

                    <Select id='cargo'
                        placeholder='Insira o cargo'
                        {...register("cargo")}>
                        <option value='Administrador' style={{ color: "#DF6064" }}>Administrador</option>
                        <option value='Desenvolvedor' style={{ color: "#DF6064" }}>Desenvolvedor</option>
                        <option value='Analista' style={{ color: "#DF6064" }}>Analista</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.cargo && errors.cargo.message}
                    </FormErrorMessage>
                </FormControl>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                    Cadastrar
                </Button>
                <Link to="/user" >
                    <Button mt={4} colorScheme='teal' type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                        Cancelar
                    </Button>
                </Link>
            </div>
        </form>
    )
}