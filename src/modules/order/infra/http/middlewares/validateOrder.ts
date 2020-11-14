import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { InferType, object, string, number } from 'yup';

type IOrder = InferType<typeof OrderSchema>;

const OrderSchema = object({
    state: string().required("Estado não informado"),
    city: string().required("Cidade não informada"),
    postalCode: string().required("Cep não informado"),
    neighborhood: string().required("Bairro não informado"),
    number: number().typeError('Número inválido').required("Número não informado"),
    street: string().required("Rua não informada"),
    recipient: string().required("Cliente não informado")
})

export default async function validateCreateUserFieldsÏ(request: Request, response: Response, next: NextFunction) {

    const order = request.body as IOrder;

    await OrderSchema.validate(order)
        .then(() => next())
        .catch(err => {
            throw new AppError(err.errors[0]);
        });
}