import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';


export default function ensureAntenthication(request: Request, response: Response, next: NextFunction) {
    const { chooser, admin } = request.user;

    if (!admin && !chooser)
        throw new AppError('Your user has no permissions to this request');

    return next();
}