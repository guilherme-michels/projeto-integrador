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
import { Link, useNavigate } from 'react-router-dom'

import React from 'react';
import { addTask } from '../../../api/Task/task.service'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'

export function AddTask() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
    })

    const navigate = useNavigate()
    const toast = useToast()

    async function onSubmit(values: any) {
        try {
            console.log(values)
            const { message } = await addTask(values)
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
                description: 'Falha na criação da tarefa',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <SidebarHeaderTeamplate>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>Cadastro de tarefas</div>
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

                <FormControl style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='responsible'>Selecione uma cor</FormLabel>
                    <Input
                        style={{ border: "none" }}
                        id='color'
                        type='color'
                        {...register("color")}
                    />
                </FormControl>


                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/tasker/tasks" >
                        <Button mt={4} colorScheme='teal' type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                            Cancelar
                        </Button>
                    </Link>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                        Cadastrar
                    </Button>
                </div>
            </form>
        </SidebarHeaderTeamplate>
    )
}