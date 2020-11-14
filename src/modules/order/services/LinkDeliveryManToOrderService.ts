import OrderRepository from '@modules/order/repositories/OrderRepository';
import AppError from '@shared/errors/AppError';
import { Types } from 'mongoose';

class LinkDeliveryManToOrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run(deliveryMan: Types.ObjectId, order_id: Types.ObjectId) {

        const order = await this.orderRepository.getOrderById(order_id);

        if (!order)
            throw new AppError('Pedido não encontrado');

        if (order.deliveredAt)
            throw new AppError('Não é possivel vincular entregador a um pedido finalizdo');

        const updatedOrder = await this.orderRepository.updateDeliveryMan(deliveryMan, order_id);

        return updatedOrder;
    }
}

export default LinkDeliveryManToOrderService;