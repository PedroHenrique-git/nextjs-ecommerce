export interface Client {
  id: number;
  providerId: string | null;
  provider: string | null;
  role: string | null;
  name: string;
  email: string;
}
