import { Box, Button, Text, useToast } from '@chakra-ui/react';
import ClientService from '@services/client/client.service';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';

interface Props {
  client: Client | undefined;
}

const clientService = new ClientService('admin');

const DeleteClient = ({ client }: Props) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return clientService.delete(Number(client?.id));
    },
    onSuccess: (data) => {
      if ('failed-request' in data) {
        toast({
          status: 'error',
          description: 'Something went wrong, try again in a few minutes',
          isClosable: true,
        });

        return;
      }

      queryClient.refetchQueries('client-module');
    },
  });

  const deleteFn = () => {
    toast({
      status: 'warning',
      isClosable: true,
      duration: null,
      position: 'top',
      render: ({ onClose }) => {
        return (
          <Box
            bgColor={'#f2cd4f'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
            borderRadius={'2xl'}
            padding={'16px'}
            gap={'3'}
          >
            <Text fontWeight={'medium'} color={'white'}>
              Do you really wanna delete this client ?
            </Text>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'3'}
            >
              <Button
                onClick={() => {
                  mutate();
                  onClose();
                }}
              >
                yes
              </Button>
              <Button onClick={onClose}>no</Button>
            </Box>
          </Box>
        );
      },
    });
  };

  if (!client) return null;

  return (
    <Button background={'transparent'} onClick={deleteFn}>
      <MdDelete />
    </Button>
  );
};

export default DeleteClient;
