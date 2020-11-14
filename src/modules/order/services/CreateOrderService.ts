import UserRepository from '@modules/user/repositories/UserRepository';
import OrderRepository from '@modules/order/repositories/OrderRepository';
import OrderSchema from '../infra/mongoose/entities/Order';

interface Order {
    recipient: string;
    street: string;
    number: number;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
}

class CreateOrderService {
    private userRepository: UserRepository;
    private orderRepository: OrderRepository;

    constructor(userRepository: UserRepository, orderRepository: OrderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public async run(newOrder: Order): Promise<OrderSchema> {
        const order = await this.orderRepository.create(newOrder);

        return order;
    }
}

export default CreateOrderService;