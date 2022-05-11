import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Textarea,
    useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editTask, getTask } from '../../../api/Task/task.service'
import { useEffect } from 'react'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'

export function EditTask() {
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
    const params = useParams();

    async function onSubmit(values: any) {
        try {
            const { message } = await editTask({ ...values, id: params.id })
            toast({
                position: 'top-right',
                description: message,
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            navigate("/tasker/tasks")
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
        getTask(params.id as any).then(res => {
            setValue('name', res.task.name);
            setValue('description', res.task.description);
            setValue('responsible', res.task.responsible);
        })
    }, [params])



    return (
        <SidebarHeaderTeamplate>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Editar tarefa</div>
                <div style={{ display: "flex" }}>
                    <FormControl isInvalid={errors.name} style={{ padding: "10px 10px" }}>
                        <FormLabel htmlFor='name'>Título</FormLabel>
                        <Input
                            id='name'
                            placeholder='Insira o título'
                            {...register("name")}
                        />
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.description} style={{ padding: "10px 10px" }}>
                        <FormLabel htmlFor='description'>Descrição</FormLabel>
                        <Textarea
                            id='description'
                            style={{ maxHeight: "200px", minHeight: "41px" }}
                            placeholder='Insira a descrição'
                            {...register("description")}
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>
                </div>

                <div style={{ display: "flex" }}>
                    <FormControl isInvalid={errors.responsible} style={{ padding: "10px 10px" }}>
                        <FormLabel htmlFor='responsible'>Responsável</FormLabel>
                        <Input
                            id='responsible'
                            type='text'
                            placeholder='Insira o responsável'
                            {...register("responsible")}
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>
                </div>

                {/* <FormControl style={{ padding: "10px 10px" }}>
                <FormLabel>Selecione uma cor</FormLabel>
                <CirclePicker
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                />
            </FormControl> */}

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/tasker/tasks" >
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