import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { Link } from 'react-router-dom'

import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

export function AddTask() {
    const [color, setColor] = useState("#fff")

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
            <div>Cadastro de tarefas</div>
            <div style={{ display: "flex" }}>
                <FormControl isInvalid={errors.titulo} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='titulo'>Título</FormLabel>
                    <Input
                        id='titulo'
                        placeholder='Insira o título'
                        {...register("titulo")}
                    />
                    <FormErrorMessage>
                        {errors.titulo && errors.titulo.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.descricao} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='descricao'>Descrição</FormLabel>
                    <Textarea
                        id='descricao'
                        style={{ maxHeight: "200px", minHeight: "41px" }}
                        placeholder='Insira a descrição'
                        {...register("descricao")}
                    />
                    <FormErrorMessage>
                        {errors.descricao && errors.descricao.message}
                    </FormErrorMessage>
                </FormControl>
            </div>

            <div style={{ display: "flex" }}>
                <FormControl isInvalid={errors.responsavel} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='responsavel'>Responsável</FormLabel>
                    <Input
                        id='responsavel'
                        type='text'
                        placeholder='Insira o responsável'
                        {...register("responsavel")}
                    />
                    <FormErrorMessage>
                        {errors.responsavel && errors.responsavel.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.dataconclusao} style={{ padding: "10px 10px" }}>
                    <FormLabel htmlFor='dataconclusao'>Data de conclusão</FormLabel>
                    <Input
                        id='dataconclusao'
                        type='date'
                        placeholder='Insira a data de conclusão'
                        {...register("dataconclusao")}

                    />
                    <FormErrorMessage>
                        {errors.dataconclusao && errors.dataconclusao.message}
                    </FormErrorMessage>
                </FormControl>
            </div>

            <FormControl style={{ padding: "10px 10px" }}>
                <FormLabel>Selecione uma cor</FormLabel>
                <CirclePicker
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                />
            </FormControl>


            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                    Cadastrar
                </Button>
                <Link to="/tasks" >
                    <Button mt={4} colorScheme='teal' type='submit' style={{ marginLeft: "10px", background: "#DF6064" }}>
                        Cancelar
                    </Button>
                </Link>
            </div>
        </form>
    )
}