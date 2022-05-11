import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { useAuth } from '../../context/AuthContext'
import React from 'react'

export const LoginForm: React.FunctionComponent = props => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
    })

    const { signIn } = useAuth();

    async function onLoginUser(values: any) {
        try {
            console.log(values)
            signIn(values)
        } catch (err) {
            console.log(err)
            console.log("erro")
        }
    }


    return (
        <form onSubmit={handleSubmit(onLoginUser)} style={{ background: "#191622", height: "100vh" }}>
            <div style={{ display: "flex" }}>
                <FormControl isInvalid={errors.email} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input
                        id='email'
                        placeholder='Insira o título'
                        {...register("email")}
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='password'>Senha</FormLabel>
                    <Input
                        type='password'
                        id='password'
                        placeholder='Insira a senha'
                        {...register("password")}
                    />
                    <FormErrorMessage>
                        {errors.password && errors.name.password}
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>

                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                    Acessar
                </Button>
            </div>
        </form>
    )
}