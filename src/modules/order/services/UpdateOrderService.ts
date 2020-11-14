import OrderRepository from '@modules/order/repositories/OrderRepository';
import { Types } from 'mongoose';
import OrderSchema from '../infra/mongoose/entities/Order';

interface Order {
    recipient: string;
    deliveryMan: Types.ObjectId;
    street: string;
    number: number;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
}

interface OrderUpdate {
    order_id: Types.ObjectId;
    order: Partial<Order>;
}

class UpdateOrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run({ order_id, order }: OrderUpdate): Promise<OrderSchema> {

        const updatedOrder = await this.orderRepository.update({ order_id, order });

        return updatedOrder;
    }
}

export default UpdateOrderService;