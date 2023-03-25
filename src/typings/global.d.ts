interface PaginatedData<T> {
  info: PaginationInfo;
  results: T;
}

interface PaginationInfo {
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  totalOfItems: number;
  totalOfPages: number;
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
  addresses?: Array<Address>;
  cellphones?: Array<Cellphone>;
}

interface Address {
  id: number;
  cep: string;
  neighborhood: string;
  street: string;
}

interface Cellphone {
  id: number;
  cellphone: string;
}

interface Order {
  id: number;
  status: string;
  clientId: number;
  client: Client;
}

interface PaginationOptions {
  page?: string;
  take?: string;
  sort?: 'asc' | 'desc';
}

type RequestError<T = unknown> = T & { 'failed-request': boolean };

type AuthContext = 'admin' | 'client';
