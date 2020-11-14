import OrderRepository from '@modules/order/repositories/OrderRepository';
import OrderSchema from '../infra/mongoose/entities/Order';

class ListAllOrdersService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run(): Promise<OrderSchema[]> {

        const orders = await this.orderRepository.findAll();

        return orders;
    }
}

export default ListAllOrdersService;