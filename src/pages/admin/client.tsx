import { DEFAULT_QUERY_OPTIONS } from '@config/index';
import { ClientModule } from '@containers/ClientModule/ClientModule';
import usePagination from '@sdk/pagination/usePagination';
import ClientService from '@services/client/client.service';
import { useQuery } from 'react-query';

const clientService = new ClientService('admin');

export default function Client() {
  const { state, dispatch } = usePagination();
  const { page, sort, take } = state;

  const { data } = useQuery({
    queryKey: [page, sort, take],
    queryFn: () => clientService.find({ page, sort, take }),
    ...DEFAULT_QUERY_OPTIONS,
  });

  return (
    <ClientModule title="Clients admin" clientData={data} dispatch={dispatch} />
  );
}
