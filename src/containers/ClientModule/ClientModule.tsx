import { Box, Heading } from '@chakra-ui/react';
import { Action } from '@sdk/pagination';
import { Dispatch } from 'react';
import ClientList from 'src/sections/admin/client/ClientList/ClientList';
import CreateClient from 'src/sections/admin/client/CreateClient/CreateClient';

interface Props {
  title: string;
  clientData: PaginatedData<Client[]> | undefined;
  dispatch: Dispatch<Action>;
}

export const ClientModule = ({ title, clientData, dispatch }: Props) => {
  return (
    <Box as="main">
      <Heading
        fontSize="medium"
        color="gray.900"
        marginBottom="4"
        textTransform={'capitalize'}
      >
        {title}
      </Heading>
      <CreateClient />
      <ClientList clientData={clientData} dispatch={dispatch} />
    </Box>
  );
};
