import React from 'react';
import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
    BoxProps,
} from '@chakra-ui/react';
import { NavItem } from './NavItem';
import {
    FiHome,
    FiArchive,
    FiUser,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: String
}
const LinkItems: LinkItemProps[] = [
    { name: 'Home', icon: FiHome, path: '/' },
    { name: 'User', icon: FiUser, path: 'user' },
    { name: 'Tasks', icon: FiArchive, path: 'tasks' },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Logo
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} path={link.path} icon={link.icon} >
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};