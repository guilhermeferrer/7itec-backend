import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@shared/configs/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
    admin: boolean;
    chooser: boolean;
}

export default function ensureAntenthication(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
        throw new AppError('Token was not found in request');

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, chooser, admin } = decoded as TokenPayload;

        request.user = {
            id: sub,
            chooser,
            admin
        }

        return next();
    } catch {
        throw new AppError('Invalid token');
    }
}