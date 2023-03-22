interface PaginatedData<T> {
  info: {
    nextPageUrl: string | null;
    prevPageUrl: string | null;
    totalOfItems: number;
    totalOfPages: number;
  };
  results: T;
}

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface Client {
  id: number;
  providerId: string;
  provider: string;
  role: string;
  name: string;
  email: string;
}

interface Order {
  id: number;
  status: string;
  clientId: number;
  client: Client;
}
