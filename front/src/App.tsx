import { ChakraProvider } from '@chakra-ui/react'
import { Routes } from './routes'
import { GlobalStyle } from './styles/GlobalStyle'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

export function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <ChakraProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ChakraProvider>
    </HashRouter>
  )
}
