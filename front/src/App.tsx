import { ChakraProvider } from '@chakra-ui/react'
import { Routes } from './routes'
import { GlobalStyle } from './styles/GlobalStyle'
import { Sidebar } from './components'
import { HashRouter } from 'react-router-dom'

export function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <ChakraProvider>
        <Sidebar>
          <Routes />
        </Sidebar>
      </ChakraProvider>
    </HashRouter>
  )
}