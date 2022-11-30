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
import { teamSchema } from './teamSchema'
import { Link, useNavigate } from 'react-router-dom'

import { addTeam } from '../../../api/Team/team.service'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'

export function AddTeam() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(teamSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit(values: any) {
    try {
      const { message } = await addTeam(values)
      toast({
        position: 'top-right',
        description: message,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/tasker/teams')
    } catch (err) {
      toast({
        position: 'top-right',
        description: 'Falha na criação do time',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <SidebarHeaderTeamplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Cadastro de times</div>
        <div style={{ display: 'flex' }}>
          <FormControl
            isInvalid={errors.team_name}
            style={{ padding: '10px 10px' }}
          >
            <FormLabel htmlFor="team_name">Nome</FormLabel>
            <Input
              id="team_name"
              placeholder="Insira o nome"
              {...register('team_name')}
            />
            <FormErrorMessage>
              {errors.team_name && errors.team_name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={errors.sector}
            style={{ padding: '10px 10px' }}
          >
            <FormLabel htmlFor="sector">Setor</FormLabel>
            <Textarea
              id="sector"
              style={{ maxHeight: '200px', minHeight: '41px' }}
              placeholder="Insira a descrição"
              {...register('sector')}
            />
            <FormErrorMessage>
              {errors.sector && errors.sector.message}
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
