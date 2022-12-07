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
  const { id } = useParams<{ id: string }>()
  const [projectId, setProjectId] = useState<string | null>(null)
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

  const [pessoas, setPessoas] = useState<User[]>([])

  async function onSubmit(values: any) {
    try {
      const { message } = await editTask({
        ...values,
        id,
        project_id: projectId,
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
        description: 'Falha na edição do usuário',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (id) {
      getTask(id).then(({ task }) => {
        console.log('task', task)
        setProjectId(task.projectId)
        setValue('status', task.status)
        setValue('person_id', task.person.id)
        setValue('name', task.name)
        setValue('description', task.description)
        setValue('color', task.color)
      })
    }

    getUsers().then(data => setPessoas(data.personList))
  }, [id])

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

        <div style={{ display: 'flex' }}>
          <FormControl style={{ padding: '10px 10px' }} isInvalid={errors.user}>
            <FormLabel htmlFor="status">Status da tarefa</FormLabel>

            <Select
              placeholder="Selecione o status da tarefa"
              style={{ background: '#fff' }}
              {...register('status')}
              id="status"
            >
              <option value={'A fazer'}>A fazer</option>
              <option value={'Em andamento'}>Em andamento</option>
              <option value={'Finalizada'}>Finalizada</option>
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
            Editar
          </Button>
        </div>
      </form>
    </SidebarHeaderTeamplate>
  )
}
