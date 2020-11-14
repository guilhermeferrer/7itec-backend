import { Router } from 'express';

import CreateUserService from '@modules/user/services/CreateUserService';
import ListAllUsersService from '@modules/user/services/ListAllUsersService';

import UserRepository from '@modules/user/repositories/UserRepository';

import ensureAntenthication from '@shared/infra/http/middlewares/ensureAntenthication';

const userRepository = new UserRepository();

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {

    const { email, name, password } = request.body;

    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.run({ email, name, password });

    user.passwordHash = undefined;

    return response.json(user);

});

usersRoutes.use(ensureAntenthication);

usersRoutes.get('/', async (request, response) => {

    const listAllUsersService = new ListAllUsersService(userRepository);

    const user = await listAllUsersService.run();

    return response.json(user);

});

export default usersRoutes;