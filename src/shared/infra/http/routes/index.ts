import { Router } from 'express';

import usersRoutes from '@modules/user/infra/http/routes/user.routes';
import sessionsRoutes from '@modules/user/infra/http/routes/sessions.routes';
import OrderRoutes from '@modules/order/infra/http/routes/order.routes';
import DeliveryManRoutes from '@modules/order/infra/http/routes/deliveryMan.routes';

const routes = Router();

routes.use('/user', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/order', OrderRoutes);
routes.use('/delivery-man', DeliveryManRoutes);

export default routes;