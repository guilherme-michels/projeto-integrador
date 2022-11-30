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
import { editTask, getTask } from '../../../api/Task/task.service'
import { useEffect, useState } from 'react'
import { SidebarHeaderTeamplate } from '../../../templates/SidebarHeaderTeamplate'
import { User } from '../../UserPage/UserInterface'
import { getUsers } from '../../../api/User/user.service'

export function EditTask() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(taskSchema),
  })

  const navigate = useNavigate()
  const toast = useToast()
  const params = useParams()

  const [pessoas, setPessoas] = useState<User[]>([])

  const fetchUsers = () => {
    getUsers().then(data => setPessoas(data.personList))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

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
      navigate('/tasker/tasks')
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
      setValue('name', res.name)
      setValue('description', res.description)
    })
  }, [params])

  return (
    <SidebarHeaderTeamplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Editar tarefa</div>
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
            <FormLabel htmlFor="pessoa_id">Usuário vinculado</FormLabel>

            <Select
              placeholder="Selecione o usuário vinculado"
              style={{ background: '#fff' }}
              {...register('pessoa_id')}
              id="pessoa_id"
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
            Editar
          </Button>
        </div>
      </form>
    </SidebarHeaderTeamplate>
  )
}
