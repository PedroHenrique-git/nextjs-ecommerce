import { Box, Button, ListItem, SimpleGrid, Text } from '@chakra-ui/react';
import { DEFAULT_QUERY_OPTIONS } from '@config/index';
import ClientService from '@services/client/client.service';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useQuery } from 'react-query';
import ClientDetails from '../ClientDetails/ClientDetails';

interface Props {
  client: Client;
}

const clientService = new ClientService('admin');

const ClientCard = ({ client }: Props) => {
  const { data } = useQuery(
    `client-${client.id}`,
    () =>
      clientService.findById(client.id, {
        showAddresses: 'true',
        showCellphones: 'true',
      }),
    DEFAULT_QUERY_OPTIONS,
  );

  return (
    <ListItem
      boxShadow={'base'}
      borderRadius="xl"
      padding={'5'}
      marginBottom={'4'}
    >
      <SimpleGrid minChildWidth="120px" spacing="40px">
        <Box>
          <Text fontSize={'medium'} color={'gray.900'} fontWeight={'bold'}>
            #id
          </Text>
          <Text fontSize={'medium'} color={'gray.600'}>
            {client.id}
          </Text>
        </Box>

        <Box>
          <Text
            fontSize={'medium'}
            color={'gray.900'}
            fontWeight={'bold'}
            textAlign={'right'}
          >
            #email
          </Text>
          <Text fontSize={'medium'} color={'gray.600'} textAlign={'right'}>
            {client.email}
          </Text>
        </Box>

        <Box>
          <Text
            fontSize={'medium'}
            color={'gray.900'}
            fontWeight={'bold'}
            textAlign={'right'}
          >
            #name
          </Text>
          <Text fontSize={'medium'} color={'gray.600'} textAlign={'right'}>
            {client.name}
          </Text>
        </Box>

        <Box>
          <Text
            fontSize={'medium'}
            color={'gray.900'}
            fontWeight={'bold'}
            textAlign={'right'}
          >
            #actions
          </Text>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'flex-end'}
          >
            <Button background={'transparent'}>
              <FaRegEdit />
            </Button>
            <ClientDetails client={data} />
            <Button background={'transparent'}>
              <MdDelete />
            </Button>
          </Box>
        </Box>
      </SimpleGrid>
    </ListItem>
  );
};

export default ClientCard;
