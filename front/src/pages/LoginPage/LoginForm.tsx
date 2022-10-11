import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './userSchema'
import { useAuth } from '../../context/AuthContext'
import React from 'react'
import loginImg from '../../../assets/loginImage.png'

export const LoginForm: React.FunctionComponent = props => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userSchema),
  })

  const { signIn } = useAuth()

  async function onLoginUser(values: any) {
    try {
      console.log(values)
      signIn(values)
    } catch (err) {
      console.log(err)
      console.log('erro')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onLoginUser)}
      style={{
        height: '100vh',
        width: '100wh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            width: '55%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={loginImg} alt="loginImg" style={{ width: '600px' }} />
        </div>

        <div
          style={{
            backgroundColor: '#783E76',
            width: '45%',
            height: '100%',
            padding: '100px',
          }}
        >
          <strong style={{ fontSize: '60px' }}>
            Welcome <br />
            Tabbleffy
          </strong>

          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '300px',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
              }}
            >
              <FormControl
                isInvalid={errors.email}
                style={{ padding: '10px 10px' }}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" placeholder="Email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={errors.password}
                style={{ padding: '10px 10px' }}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  placeholder="password"
                  {...register('password')}
                />
                <FormErrorMessage>
                  {errors.password && errors.name.password}
                </FormErrorMessage>
              </FormControl>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div></div>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                style={{ marginLeft: '10px', background: '#ae5bae' }}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
