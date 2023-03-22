import api from '@sdk/api/api';

const getClients = async (): Promise<PaginatedData<Client>> => {
  const request = await api.get('client');

  return request.json();
};

export default getClients;
