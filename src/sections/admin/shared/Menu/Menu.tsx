import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import useGetAdminSession from '@sdk/session/useGetAdminSession';
import useMenuAdmin from '@sdk/ui/useMenuAdmin';
import NextLink from 'next/link';
import { useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import LogoutButton from '../../auth/LogoutButton';
import { adminMenuLinks } from './admin-menu-links';

const Menu = () => {
  const { isOpen, onClose, onOpen } = useMenuAdmin();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const { user } = useGetAdminSession();

  return (
    <>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        <AiOutlineMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader display={'flex'} alignItems={'center'}>
            <Button
              colorScheme={'gray'}
              gap={'3'}
              onClick={onClose}
              marginRight={'5'}
            >
              <AiOutlineClose />
            </Button>

            <Text fontSize={'medium'} color={'gray.800'}>
              Hello, {user?.email}
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <List>
              {adminMenuLinks.map((menuItem) => (
                <ListItem key={menuItem.text} onClick={onClose}>
                  <Link as={NextLink} href={menuItem.link}>
                    {menuItem.text}
                  </Link>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter>
            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Menu;
