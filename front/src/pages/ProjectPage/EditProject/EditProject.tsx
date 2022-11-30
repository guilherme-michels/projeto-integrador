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
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'
import { editProject, getProject } from '../../../api/Project/project.service'

export function EditProject() {
  const params = useParams()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(projectSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()

  async function onSubmit(values: any) {
    try {
      const { message } = await editProject({ ...values, id: params.id })
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
        description: 'Falha na edição do projeto',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    getProject(params.id as any).then(res => {
      setValue('nome', res.project.name)
    })
  }, [params])

  return (
    <SidebarHeaderTeamplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Editar {{}}</div>
        <div style={{ display: 'flex' }}>
          <FormControl isInvalid={errors.name} style={{ padding: '10px 10px' }}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              placeholder="Insira o name"
              {...register('name')}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/tasker/projects">
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
