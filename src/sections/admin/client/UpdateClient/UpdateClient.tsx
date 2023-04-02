import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import ClientForm from '../ClientForm/ClientForm';

interface Props {
  client: Client | undefined;
}

const UpdateClient = ({ client }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!client) return null;

  return (
    <>
      <Button onClick={onOpen} background={'transparent'}>
        <FaRegEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalBody padding={'24px'}>
            <ClientForm
              title="Update client"
              type="update"
              client={client}
              closeUpdateModal={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateClient;
