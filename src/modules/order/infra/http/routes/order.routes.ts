import { Router } from 'express';
import { Types } from 'mongoose';

import CreateOrderService from '@modules/order/services/CreateOrderService';
import DeleteOrderService from '@modules/order/services/DeleteOrderService';
import ListAllOrdersService from '@modules/order/services/ListAllOrdersService';
import ListDeliveryManOrdersService from '@modules/order/services/ListDeliveryManOrdersService';
import FinishOrderService from '@modules/order/services/FinishOrderService';

import UserRepository from '@modules/user/repositories/UserRepository';
import OrderRepository from '@modules/order/repositories/OrderRepository';
import UpdateOrderService from '@modules/order/services/UpdateOrderService';

import ensureAntenthication from '@shared/infra/http/middlewares/ensureAntenthication';
import checkIsAdmin from '@shared/infra/http/middlewares/checkIsAdmin';
import checkIsChooser from '@shared/infra/http/middlewares/checkIsChooser';

import validateOrder from '../middlewares/validateOrder';

const sessionsRoutes = Router();
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();

interface Order {
    recipient: string;
    deliveryMan: string;
    street: string;
    number: number;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
}

sessionsRoutes.use(ensureAntenthication);

sessionsRoutes.get('/:deliveryMan', async (request, response) => {

    const deliveryMan = Types.ObjectId(request.params.deliveryMan);

    const listDeliveryManOrdersService = new ListDeliveryManOrdersService(orderRepository);

    const orders = await listDeliveryManOrdersService.run(deliveryMan);

    return response.json(orders);
});

sessionsRoutes.put('/finish/:order_id', async (request, response) => {

    const order_id = Types.ObjectId(request.params.order_id);
    const user_id = Types.ObjectId(request.user.id);

    const finishOrderService = new FinishOrderService(orderRepository);

    const orders = await finishOrderService.run(order_id, user_id);

    return response.json(orders);
});

sessionsRoutes.use(checkIsChooser);

sessionsRoutes.get('/', async (request, response) => {
    const listAllOrdersService = new ListAllOrdersService(orderRepository);

    const orders = await listAllOrdersService.run();

    return response.json(orders);
});

sessionsRoutes.post('/', validateOrder, async (request, response) => {

    const { recipient, street, number, neighborhood, city, state, postalCode } = request.body as Order;

    const createOrderService = new CreateOrderService(userRepository, orderRepository);

    const order = await createOrderService.run({ recipient, street, number, neighborhood, city, state, postalCode });

    return response.json(order);
});

sessionsRoutes.use(checkIsAdmin);

sessionsRoutes.delete('/:order_id', async (request, response) => {

    const order_id = Types.ObjectId(request.params.order_id);

    const deleteOrderService = new DeleteOrderService(orderRepository);

    const orders = await deleteOrderService.run(order_id);

    return response.json(orders);
});

sessionsRoutes.put('/:order_id', validateOrder, async (request, response) => {

    const { recipient, street, number, neighborhood, city, state, postalCode } = request.body as Order;
    const order_id = Types.ObjectId(request.params.order_id);

    const updateOrderService = new UpdateOrderService(orderRepository);

    const order = await updateOrderService.run({ order_id, order: { recipient, street, number, neighborhood, city, state, postalCode } });

    return response.json(order);
});

export default sessionsRoutes;