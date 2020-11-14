import OrderEntity from '@modules/order/infra/mongoose/entities/Order';
import { getModelForClass, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import OrderSchema from '@modules/order/infra/mongoose/entities/Order';

interface OrderDTO {
    recipient: string;
    street: string;
    number: number;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
}

interface OrderUpdate {
    order_id: Types.ObjectId;
    order: Partial<OrderDTO>;
}

class OrderRepository {
    public async create(newOrder: OrderDTO) {
        const orderEntity = getModelForClass(OrderEntity);
        const order = await orderEntity.create(newOrder);

        return order;
    }

    public async findAll(): Promise<OrderEntity[]> {
        const orderEntity = getModelForClass(OrderEntity);

        console.log(OrderEntity.name);

        const orders = await orderEntity.aggregate(
            [
                {
                    $sort: { "createdAt": -1 }
                },
                {
                    "$lookup": {
                        "from": 'userschemas',
                        "localField": "deliveryMan",
                        "foreignField": `_id`,
                        "as": "deliveryMan"
                    }
                },
                {
                    $project: {
                        date: {
                            $dateToString: {
                                date: "$createdAt",
                                format: "%Y-%m-%d",
                                timezone: 'America/Sao_Paulo'
                            }
                        },
                        order: {
                            _id: "$_id",
                            recipient: "$recipient",
                            street: "$street",
                            number: "$number",
                            neighborhood: "$neighborhood",
                            city: "$city",
                            state: "$state",
                            postalCode: "$postalCode",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt",
                            deliveredAt: "$deliveredAt",
                            deliveryMan: {
                                $arrayElemAt: ["$deliveryMan.name", 0]
                            },
                        }
                    }
                },
                {
                    $group: {
                        _id: "$date",
                        orders: {
                            $push: "$$ROOT.order"
                        }
                    }
                },
                {
                    $addFields: {
                        date: '$_id'
                    }

                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: { "date": -1 }
                }
            ]
        );

        return orders;
    }

    public async findAllById(deliveryMan: Types.ObjectId): Promise<OrderEntity[]> {
        const orderEntity = getModelForClass(OrderEntity);

        const orders = await orderEntity.aggregate(
            [
                {
                    $sort: { "createdAt": -1 }
                },
                {
                    $match: {
                        deliveryMan,
                        deliveredAt: { $eq: null }
                    }
                },
                {
                    "$lookup": {
                        "from": 'userschemas',
                        "localField": "deliveryMan",
                        "foreignField": `_id`,
                        "as": "deliveryMan"
                    }
                },
                {
                    $project: {
                        date: {
                            $dateToString: {
                                date: "$createdAt",
                                format: "%Y-%m-%d",
                                timezone: 'America/Sao_Paulo'
                            }
                        },
                        order: {
                            _id: "$_id",
                            recipient: "$recipient",
                            street: "$street",
                            number: "$number",
                            neighborhood: "$neighborhood",
                            city: "$city",
                            state: "$state",
                            postalCode: "$postalCode",
                            createdAt: "$createdAt",
                            updatedAt: "$updatedAt",
                            deliveredAt: "$deliveredAt",
                            deliveryMan: {
                                $arrayElemAt: ["$deliveryMan.name", 0]
                            },
                        }
                    }
                },
                {
                    $group: {
                        _id: "$date",
                        orders: {
                            $push: "$$ROOT.order"
                        }
                    }
                },
                {
                    $addFields: {
                        date: '$_id'
                    }

                },
                {
                    $project: {
                        _id: 0
                    }
                },
                {
                    $sort: { "date": -1 }
                },
            ]
        );

        console.log(orders)

        return orders;
    }

    public async update({ order_id, order }: OrderUpdate): Promise<OrderEntity> {
        const orderEntity = getModelForClass(OrderEntity);
        const updatedOrder = await orderEntity.updateOne({ _id: order_id }, order);

        return updatedOrder;
    }

    public async delete(order_id: Types.ObjectId): Promise<OrderSchema | null> {
        const orderEntity = getModelForClass(OrderEntity);
        const deleted = await orderEntity.findOneAndDelete({ _id: order_id });

        return deleted;
    }

    public async updateDeliveryMan(deliveryMan: Types.ObjectId, order_id: Types.ObjectId) {
        const orderEntity = getModelForClass(OrderEntity);

        await orderEntity.findOneAndUpdate({ _id: order_id }, { deliveryMan });
    }

    public async updateOrderStatus(order_id: Types.ObjectId) {
        const orderEntity = getModelForClass(OrderEntity);

        await orderEntity.findOneAndUpdate({ _id: order_id }, { deliveredAt: new Date() });
    }

    public async getOrderById(order_id: Types.ObjectId): Promise<OrderSchema | null> {
        const orderEntity = getModelForClass(OrderEntity);

        const order = await orderEntity.findOne({ _id: order_id });

        return order;
    }

    public async getOrderByIdAndDeliveryMan(deliveryMan: Types.ObjectId, order_id: Types.ObjectId) {
        const orderEntity = getModelForClass(OrderEntity);

        const order = await orderEntity.findOne({ deliveryMan, _id: order_id });

        return order;
    }
}

export default OrderRepository;