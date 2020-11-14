import UserSchema from '@modules/user/infra/mongoose/entities/User';
import { prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class OrderSchema extends TimeStamps {
    @prop()
    public recipient!: string;

    @prop({ ref: UserSchema })
    public deliveryMan?: Ref<UserSchema>;

    @prop({ required: true })
    public street!: string;

    @prop({ required: true })
    public number!: number;

    @prop({ required: true })
    public neighborhood!: string;

    @prop({ required: true })
    public postalCode!: string;

    @prop({ required: true })
    public city!: string;

    @prop({ required: true })
    public state!: string;

    @prop({ default: null })
    public deliveredAt?: Date;
}

export default OrderSchema;