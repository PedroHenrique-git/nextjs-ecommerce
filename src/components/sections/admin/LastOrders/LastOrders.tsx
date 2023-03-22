import { List } from '@chakra-ui/react';
import OrderCard from '../OrderCard';

interface Props {
  orders: Order[];
}

const LastOrders = ({ orders }: Props) => {
  if (!orders.length) return null;

  return (
    <List display="flex" flexDirection={'column'}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </List>
  );
};

export default LastOrders;
