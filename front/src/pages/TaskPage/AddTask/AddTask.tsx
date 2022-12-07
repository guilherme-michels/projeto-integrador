import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  useToast,
  Select,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { taskSchema } from './taskSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'

import React, { useEffect, useState } from 'react'
import { addTask } from '../../../api/Task/task.service'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'
import { User } from '../../UserPage/UserInterface'
import { getUsers } from '../../../api/User/user.service'
import { getProject } from '../../../api/Project/project.service'
import { Project } from '../../ProjectPage/ProjectInterface'

export function AddTask() {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<Project | null>(null)

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(taskSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()
  const [pessoas, setPessoas] = useState<User[]>([])

  const fetchUsers = () => {
    getUsers().then(data => setPessoas(data.personList))
  }

  useEffect(() => {
    if (projectId) {
      getProject(projectId).then(response => setProject(response.project))
    }

    fetchUsers()
  }, [])

  async function onSubmit(values: any) {
    try {
      console.log(values)
      const { message } = await addTask({
        ...values,
        project_id: projectId,
        status: 'A fazer',
      })
      toast({
        position: 'top-right',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate(`/tasker/project/${projectId}`)
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
        <div>Cadastrar tarefa em projeto {project?.name}</div>
        <div style={{ display: 'flex' }}>
          <FormControl isInvalid={errors.name} style={{ padding: '10px 10px' }}>
            <FormLabel htmlFor="name">Título</FormLabel>
            <Input
              id="name"
              placeholder="Insira o título"
              {...register('name')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.description}
            style={{ padding: '10px 10px' }}
          >
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              style={{ maxHeight: '200px', minHeight: '41px' }}
              placeholder="Insira a descrição"
              {...register('description')}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <div style={{ display: 'flex' }}>
          <FormControl style={{ padding: '10px 10px' }} isInvalid={errors.user}>
            <FormLabel htmlFor="person_id">Usuário vinculado</FormLabel>

            <Select
              placeholder="Selecione o usuário vinculado"
              style={{ background: '#fff' }}
              {...register('person_id')}
              id="person_id"
            >
              {pessoas.map(pessoa => (
                <option value={pessoa.id}>{pessoa.name}</option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <FormControl style={{ padding: '10px 10px' }}>
          <FormLabel htmlFor="color">Selecione uma cor</FormLabel>
          <Input
            style={{ border: 'none', width: '70px' }}
            id="color"
            type="color"
            {...register('color')}
          />
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/tasker/project/${projectId}`}>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              style={{ marginLeft: '10px', background: '#783E76' }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            style={{ marginLeft: '10px', background: '#783E76' }}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </SidebarHeaderTeamplate>
  )
}
