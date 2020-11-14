import { Router } from 'express';

import LinkDeliveryManToOrderService from '@modules/order/services/LinkDeliveryManToOrderService';

import OrderRepository from '@modules/order/repositories/OrderRepository';

import ensureAntenthication from '@shared/infra/http/middlewares/ensureAntenthication';
import checkIsChooser from '@shared/infra/http/middlewares/checkIsChooser';
import { Types } from 'mongoose';

const sessionsRoutes = Router();
const orderRepository = new OrderRepository();

sessionsRoutes.use(ensureAntenthication);

sessionsRoutes.use(checkIsChooser);

sessionsRoutes.put('/', async (request, response) => {
    const { order_id } = request.body;

    const deliveryMan = Types.ObjectId(request.body.delivery_man);

    const linkDeliveryManToOrderService = new LinkDeliveryManToOrderService(orderRepository);

    const orders = await linkDeliveryManToOrderService.run(deliveryMan, order_id);

    return response.json(orders);
});

export default sessionsRoutes;