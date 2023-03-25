import { List } from '@chakra-ui/react';
import { Action } from '@sdk/pagination';
import Pagination from '@sections/Pagination/Pagination';
import { Dispatch } from 'react';
import ClientCard from '../ClientCard/ClientCard';

interface Props {
  clientData: PaginatedData<Client[]> | undefined;
  dispatch: Dispatch<Action>;
}

const ClientList = ({ clientData, dispatch }: Props) => {
  if (!clientData) return null;

  const { results: clients, info } = clientData;

  return (
    <>
      <List display="flex" flexDirection={'column'}>
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </List>
      <Pagination paginationInfo={info} dispatch={dispatch} />
    </>
  );
};

export default ClientList;
