import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react'
import { NavItem } from './NavItem'
import { FiHome, FiArchive, FiUser } from 'react-icons/fi'
import { IconType } from 'react-icons'
import logoImg from '../../../assets/logo.png'

interface LinkItemProps {
  name: string
  icon: IconType
  path: String
}
const LinkItems: LinkItemProps[] = [
  { name: 'Menu', icon: FiHome, path: '/' },
  { name: 'Usuarios', icon: FiUser, path: '/tasker/user' },
  { name: 'Tarefas', icon: FiArchive, path: '/tasker/tasks' },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('#783E76', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.700', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="26px"
          fontFamily="monospace"
          fontWeight="bold"
          color="#fff"
        >
          Tabblefy
        </Text>
        <img src={logoImg} alt="logoImg" width={38} />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} path={link.path} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
