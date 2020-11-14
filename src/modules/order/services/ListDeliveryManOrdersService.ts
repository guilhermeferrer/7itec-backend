import OrderRepository from '@modules/order/repositories/OrderRepository';
import OrderSchema from '../infra/mongoose/entities/Order';
import { Types } from 'mongoose';

class ListDeliveryManOrdersService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run(deliveryMan: Types.ObjectId): Promise<OrderSchema[]> {

        const orders = await this.orderRepository.findAllById(deliveryMan);

        return orders;
    }
}

export default ListDeliveryManOrdersService;