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
import { teamSchema } from './teamSchema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editTeam, getTeam } from '../../../api/Team/team.service'
import { useEffect } from 'react'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'

export function EditTeam() {
  const params = useParams()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(teamSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit(values: any) {
    try {
      const { message } = await editTeam({ ...values, id: params.id })
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
        description: 'Falha na edição do time',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    getTeam(params.id as any).then(res => {
      setValue('team_name', res.team.team_name)
      setValue('sector', res.team.sector)
    })
  }, [params])

  return (
    <SidebarHeaderTeamplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Editar</div>
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
            <Input
              id="sector"
              placeholder="Insira o sector"
              {...register('sector')}
            />
            <FormErrorMessage>
              {errors.sector && errors.sector.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/tasker/teams">
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
            Editar
          </Button>
        </div>
      </form>
    </SidebarHeaderTeamplate>
  )
}
