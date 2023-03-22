import { Box, Heading } from '@chakra-ui/react';
import Info from '@components/sections/admin/Info/Info';
import LastOrders from '@components/sections/admin/LastOrders';

interface AdminProps {
  quantityOfClients: number;
  orders: PaginatedData<Order[]> | undefined;
}

export const Admin = ({ quantityOfClients, orders }: AdminProps) => {
  return (
    <Box as="main">
      <Heading fontSize="medium" color="gray.900" marginBottom="4">
        General infos
      </Heading>
      <Info infoTitle="Total of clients:" infoData={quantityOfClients ?? 0} />
      <Info
        infoTitle="Total of orders:"
        infoData={orders?.info?.totalOfItems ?? 0}
      />
      <Heading
        fontSize="medium"
        color="gray.900"
        marginTop="5"
        marginBottom="5"
      >
        Last orders
      </Heading>
      <LastOrders orders={orders?.results ?? []} />
    </Box>
  );
};
