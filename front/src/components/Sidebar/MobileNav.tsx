import React from 'react'

import {
  IconButton,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import { FiMenu, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

interface MobileProps extends FlexProps {
  onOpen: () => void
}

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { signOut, user } = useAuth()

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('#fff', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.700', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      ></Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="#000">
                    {user.name}
                  </Text>
                  <Text fontSize="xs" color="#783E76">
                    {user.cargo}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown color="black" />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('#fff', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem style={{ color: '#000' }}>Conta</MenuItem>
              <MenuItem style={{ color: '#000' }}>Configuracoes</MenuItem>
              <MenuDivider />
              <MenuItem style={{ color: '#000' }} onClick={signOut}>
                Desconectar
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
