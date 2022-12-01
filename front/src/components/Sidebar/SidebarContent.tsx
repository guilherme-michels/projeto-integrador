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
import { AiFillProject, AiOutlineTeam } from 'react-icons/ai'
import { IconType } from 'react-icons'
import logoImg from '../../../assets/logo.png'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import { getProjects } from '../../api/Project/project.service'
import { useEffect, useState } from 'react'
import { Project } from '../../pages/ProjectPage/ProjectInterface'

interface LinkItemProps {
  name: string
  icon: IconType
  path: String
}

const LinkItems: LinkItemProps[] = [
  { name: 'Menu', icon: FiHome, path: '/' },
  { name: 'Usuarios', icon: FiUser, path: '/tasker/user' },
  { name: 'Tarefas', icon: FiArchive, path: '/tasker/tasks' },
  { name: 'Times', icon: AiOutlineTeam, path: '/tasker/teams' },
]

interface SidebarProps extends BoxProps {
  onClose: () => void
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(data => setProjects(data.projectList))
  }, [])

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
      <Menu
        menuButton={
          <MenuButton style={{ width: '100%' }}>
            <NavItem key="Projeto" path="" icon={AiFillProject}>
              Projetos
            </NavItem>
          </MenuButton>
        }
      >
        {projects.map(project => (
          <MenuItem style={{ width: '240px', opacity: '0.6' }}>
            <NavItem
              key="Projeto"
              path={'/tasker/project/' + project.id}
              icon={AiFillProject}
            >
              {project.name}
            </NavItem>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
