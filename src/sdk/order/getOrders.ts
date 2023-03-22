import api from '@sdk/api/api';

const getOrders = async (): Promise<PaginatedData<Order[]>> => {
  const request = await api.get('order?take=5&sort=desc&showClient=true');

  return request.json();
};

export default getOrders;
