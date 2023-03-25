import { Badge, Box, Grid, GridItem, ListItem, Text } from '@chakra-ui/react';

interface Props {
  order: Order;
}

const OrderCard = ({ order }: Props) => {
  return (
    <ListItem
      display="flex"
      justifyContent={'space-between'}
      flexWrap="wrap"
      gap={'3'}
      boxShadow={'base'}
      borderRadius="xl"
      padding={'5'}
      marginBottom={'4'}
    >
      <Grid
        templateColumns="1fr 1fr 1fr"
        justifyContent={'space-between'}
        w={'100%'}
      >
        <GridItem justifySelf={'flex-start'}>
          <Box>
            <Text fontSize={'medium'} color={'gray.900'} fontWeight={'bold'}>
              #id
            </Text>
            <Text fontSize={'medium'} color={'gray.600'}>
              {order.id}
            </Text>
          </Box>
        </GridItem>
        <GridItem justifySelf={'center'}>
          <Box>
            <Text fontSize={'medium'} color={'gray.900'} fontWeight={'bold'}>
              #status
            </Text>
            <Text fontSize={'medium'} color={'gray.600'}>
              <Badge>{order.status}</Badge>
            </Text>
          </Box>
        </GridItem>
        <GridItem justifySelf={'end'}>
          <Box>
            <Text
              fontSize={'medium'}
              color={'gray.900'}
              fontWeight={'bold'}
              textAlign={'right'}
            >
              #client
            </Text>
            <Text fontSize={'medium'} color={'gray.600'} textAlign={'right'}>
              {order.client.name}
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </ListItem>
  );
};

export default OrderCard;
