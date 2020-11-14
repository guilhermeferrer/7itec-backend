import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '../mongoose';
import cors from 'cors';

const { API_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            error: err.message
        });
    }

    console.error(err);

    return response.status(500).json({
        error: 'Internal server error'
    });
});

app.listen(API_PORT);