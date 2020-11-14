import OrderRepository from '@modules/order/repositories/OrderRepository';
import AppError from '@shared/errors/AppError';
import { Types } from 'mongoose';

class DeleteOrderService {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async run(order_id: Types.ObjectId) {

        const deleted = await this.orderRepository.delete(order_id);

        if (!deleted)
            throw new AppError('Encomenda não encontrada!', 400);
    }
}

export default DeleteOrderService;