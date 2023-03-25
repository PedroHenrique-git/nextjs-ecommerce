import { DEFAULT_QUERY_OPTIONS } from '@config/index';
import { Admin } from '@containers/Admin/Admin';
import { useQuery } from 'react-query';
import ClientService from 'src/services/client/client.service';
import OrderService from 'src/services/order/order.service';

const clientService = new ClientService('admin');
const orderService = new OrderService('admin');

export default function Index() {
  const { data: clients } = useQuery(
    'clients',
    () => clientService.find({ sort: 'desc', take: '5' }),
    DEFAULT_QUERY_OPTIONS,
  );

  const { data: orders } = useQuery(
    'orders',
    () => orderService.find({ sort: 'desc', take: '5', showClient: 'true' }),
    DEFAULT_QUERY_OPTIONS,
  );

  return (
    <Admin
      quantityOfClients={clients?.info.totalOfItems ?? 0}
      orders={orders}
    />
  );
}
