import UserRepository from '@modules/user/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

interface User {
    name: string,
    email: string,
    password: string
}

class SessionController {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async run({ name, email, password }: User) {

        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists)
            throw new AppError('Email já cadastrado!', 400);

        const passwordHash = await hash(password, 8);

        const user = await this.userRepository.create({ name, email, passwordHash });

        return user;
    }
}

export default SessionController;