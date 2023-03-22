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
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import LogoutButton from '../LogoutButton';
import { adminMenuLinks } from './admin-menu-links';

const Menu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);

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
          <DrawerHeader>
            <Button colorScheme={'gray'} gap={'3'} onClick={onClose}>
              <AiOutlineClose />
            </Button>
          </DrawerHeader>

          <DrawerBody>
            <List>
              {adminMenuLinks.map((menuItem) => (
                <ListItem key={menuItem.text}>
                  <Link as={Link} href={menuItem.link}>
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
