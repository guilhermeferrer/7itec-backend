import { Router } from 'express';
import UserRepository from '@modules/user/repositories/UserRepository';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';

const sessionsRoutes = Router();
const userRepository = new UserRepository();

sessionsRoutes.post('/', async (request, response) => {

    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService(userRepository);

    const profile = await authenticateUserService.run({ email, password });

    profile.user.passwordHash = undefined;

    return response.json(profile);

});

export default sessionsRoutes;