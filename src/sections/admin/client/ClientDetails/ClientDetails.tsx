import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineEye } from 'react-icons/ai';

interface Props {
  client: Client | undefined;
}

const ClientDetails = ({ client }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!client) return null;

  return (
    <>
      <Button onClick={onOpen} background={'transparent'}>
        <AiOutlineEye />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalBody>
            <Card boxShadow={'none'}>
              <CardHeader>
                <Heading size="md">{client.name}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Personal
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      <Text as={'span'} fontWeight={'bold'}>
                        email:
                      </Text>{' '}
                      {client.email}
                    </Text>
                  </Box>
                  {client.addresses?.length && (
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Addresses
                      </Heading>
                      <List>
                        {client.addresses?.map((address, index) => (
                          <ListItem key={address.id} marginTop={'8'}>
                            <Heading size="xs" textTransform="uppercase">
                              address #{index + 1}
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              <Text as={'span'} fontWeight={'bold'}>
                                street:
                              </Text>{' '}
                              {address.street}
                            </Text>
                            <Text pt="2" fontSize="sm">
                              <Text as={'span'} fontWeight={'bold'}>
                                cep:
                              </Text>{' '}
                              {address.cep}
                            </Text>
                            <Text pt="2" fontSize="sm">
                              <Text as={'span'} fontWeight={'bold'}>
                                neighborhood:
                              </Text>{' '}
                              {address.neighborhood}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  {client.cellphones?.length && (
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        Cellphones
                      </Heading>
                      <List>
                        {client.cellphones?.map((cellphone, index) => (
                          <ListItem key={cellphone.id} marginTop={'8'}>
                            <Heading size="xs" textTransform="uppercase">
                              cellphone #{index + 1}
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              <Text as={'span'} fontWeight={'bold'}>
                                cellphone:
                              </Text>{' '}
                              {cellphone.cellphone}
                            </Text>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClientDetails;
