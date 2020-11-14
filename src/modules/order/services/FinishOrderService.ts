import OrderRepository from '@modules/order/repositories/OrderRepository';
import UserRepository from '@modules/user/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { Types } from 'mongoose';

class FinishOrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run(order_id: Types.ObjectId, deliveryMan: Types.ObjectId) {

        const isDeliveryManInOrder = await this.orderRepository.getOrderByIdAndDeliveryMan(deliveryMan, order_id);

        if (!isDeliveryManInOrder)
            throw new AppError('Somente o usuário vinculado como entregador pode finalizar a entrega!');

        const { deliveredAt } = isDeliveryManInOrder;

        if (deliveredAt)
            throw new AppError('Entrega já finalizada');

        const updatedOrder = await this.orderRepository.updateOrderStatus(order_id);

        return updatedOrder;
    }
}

export default FinishOrderService;