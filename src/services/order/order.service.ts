import { AUTH_CONTEXT_HEADER } from '@config/index';
import api from '@sdk/api/api';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

class OrderService {
  private authContext: AuthContext = 'admin';

  constructor(authContext: AuthContext) {
    this.authContext = authContext;
  }

  private get getCommonHeaders() {
    const headers = new Headers();

    headers.set(AUTH_CONTEXT_HEADER, this.authContext);

    return headers;
  }

  create(order: CreateOrderDto): Promise<Order> {
    return api
      .post('order', {
        json: order,
        headers: this.getCommonHeaders,
      })
      .json();
  }

  find({
    page,
    sort,
    take,
    showClient,
  }: PaginationOptions & { showClient?: string } = {}): Promise<
    PaginatedData<Order[]>
  > {
    const params = new URLSearchParams();

    page && params.set('page', page);
    take && params.set('take', take);
    sort && params.set('sort', sort);
    showClient && params.set('showClient', showClient);

    return api
      .get(`order?${params.toString()}`, { headers: this.getCommonHeaders })
      .json();
  }

  findById(id: number): Promise<Client> {
    return api.get(`order/${id}`, { headers: this.getCommonHeaders }).json();
  }

  delete(id: number): Promise<Order> {
    return api.delete(`order/${id}`, { headers: this.getCommonHeaders }).json();
  }

  update(id: number, order: UpdateOrderDto): Promise<Order> {
    return api
      .patch(`order/${id}`, { json: order, headers: this.getCommonHeaders })
      .json();
  }
}

export default OrderService;
