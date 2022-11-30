import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { projectSchema } from './projectSchema'
import { Link, useNavigate } from 'react-router-dom'

import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'
import { addProject } from '../../../api/Project/project.service'

export function AddProject() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(projectSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit(values: any) {
    try {
      console.log(values)
      const { message } = await addProject(values)
      toast({
        position: 'top-right',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/tasker/projects')
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha na criação do projeto',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <SidebarHeaderTeamplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Cadastro de projetos</div>
        <div style={{ display: 'flex' }}>
          <FormControl isInvalid={errors.name} style={{ padding: '10px 10px' }}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              placeholder="Insira o nome"
              {...register('name')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/tasker/tasks">
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
