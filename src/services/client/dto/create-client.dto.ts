export interface CreateClientDto {
  providerId?: string;
  provider?: string;
  role?: string;
  name: string;
  email: string;
  password: string;
}
