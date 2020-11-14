import UserRepository from "../repositories/UserRepository";
import UseEntity from '../infra/mongoose/entities/User';
import AppError from "@shared/errors/AppError";
import { compare } from 'bcryptjs';
import { Optional } from "utility-types";
import { sign } from 'jsonwebtoken';
import authConfig from '@shared/configs/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Optional<UseEntity>;
    token: string;
}

class AuthenticateUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async run({ email, password }: Request): Promise<Response> {
        const user = await this.userRepository.findByEmail(email);

        if (!user)
            throw new AppError("Email ou senha incorretos", 400);

        const passwordMatched = await compare(password, user.passwordHash);

        if (!passwordMatched)
            throw new AppError("Email ou senha incorretos", 400);

        const token = sign({ chooser: user.chooser, admin: user.admin }, authConfig.jwt.secret, {
            subject: user._id.toString(),
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserService;