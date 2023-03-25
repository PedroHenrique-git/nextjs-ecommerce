import { AUTH_CONTEXT_HEADER } from '@config/index';
import api from '@sdk/api/api';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

class ClientService {
  private authContext: AuthContext = 'admin';

  constructor(authContext: AuthContext) {
    this.authContext = authContext;
  }

  private get getCommonHeaders() {
    const headers = new Headers();

    headers.set(AUTH_CONTEXT_HEADER, this.authContext);

    return headers;
  }

  create(client: CreateClientDto): Promise<Client> {
    return api
      .post('client', {
        json: client,
        headers: this.getCommonHeaders,
      })
      .json();
  }

  find({ page, sort, take }: PaginationOptions = {}): Promise<
    PaginatedData<Client[]>
  > {
    const params = new URLSearchParams();

    page && params.set('page', page);
    take && params.set('take', take);
    sort && params.set('sort', sort);

    return api
      .get(`client?${params.toString()}`, { headers: this.getCommonHeaders })
      .json();
  }

  findById(
    id: number,
    {
      showCellphones,
      showAddresses,
    }: { showCellphones?: string; showAddresses?: string } = {},
  ): Promise<Client> {
    const params = new URLSearchParams();

    showCellphones && params.set('showCellphones', showCellphones);
    showAddresses && params.set('showAddresses', showAddresses);

    return api
      .get(`client/${id}?${params.toString()}`, {
        headers: this.getCommonHeaders,
      })
      .json();
  }

  delete(id: number): Promise<Client> {
    return api
      .delete(`client/${id}`, { headers: this.getCommonHeaders })
      .json();
  }

  update(id: number, client: UpdateClientDto): Promise<Client> {
    return api
      .patch(`client/${id}`, { json: client, headers: this.getCommonHeaders })
      .json();
  }
}

export default ClientService;
