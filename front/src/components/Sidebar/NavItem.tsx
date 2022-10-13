import React, { ReactText } from 'react'
import { Flex, Icon, Link as LinkChakra, FlexProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

interface NavItemProps extends FlexProps {
  icon: IconType
  path: String
  children: ReactText
}

export const NavItem = ({ icon, path, children, ...rest }: NavItemProps) => {
  return (
    <Link to={path as any}>
      <LinkChakra
        href="#"
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          color="white"
          p="3"
          mx="4"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#956D94',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </LinkChakra>
    </Link>
  )
}
