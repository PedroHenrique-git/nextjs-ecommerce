import { Admin } from '@containers/Admin/Admin';
import getClients from '@sdk/clients/getClients';
import getOrders from '@sdk/order/getOrders';
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';

export default function Index() {
  const { data: clients } = useQuery('clients', getClients, { enabled: false });
  const { data: orders } = useQuery('orders', getOrders, { enabled: false });

  return (
    <Admin
      quantityOfClients={clients?.info.totalOfItems ?? 0}
      orders={orders}
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('clients', getClients);
  await queryClient.prefetchQuery('orders', getOrders);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
