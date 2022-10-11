import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Select,
    useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editUser, getUser } from '../../../api/User/user.service'
import { useEffect } from 'react'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'

export function EditUser() {

    const params = useParams();

    console.log(params.id)

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        resolver: yupResolver(userSchema),
    })

    const navigate = useNavigate()
    const toast = useToast()


    async function onSubmit(values: any) {
        try {
            const { message } = await editUser({ ...values, id: params.id })
            toast({
                position: 'top-right',
                description: message,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate("/tasker/user")
        } catch (err) {
            toast({
                position: 'top-right',
                description: 'Falha na edição do usuário',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        getUser(params.id as any).then(res => {
            setValue('name', res.person.name);
            setValue('email', res.person.email);
            setValue('telefone', res.person.telefone);
            setValue('cargo', res.person.cargo);
        })
    }, [params])

    return (
        <SidebarHeaderTeamplate>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Editar Nome</div>
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
                    <Link to="/tasker/user" >
                        <Button mt={4} colorScheme='teal' type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                            Cancelar
                        </Button>
                    </Link>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                        Editar
                    </Button>

                </div>
            </form>
        </SidebarHeaderTeamplate>
    )
}