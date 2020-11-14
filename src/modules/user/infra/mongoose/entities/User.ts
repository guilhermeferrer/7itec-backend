import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class UserSchema extends TimeStamps {
    @prop()
    public name!: string;

    @prop()
    public email!: string;

    @prop()
    public passwordHash!: string;

    @prop()
    public admin?: boolean;

    @prop()
    public chooser?: boolean;
}

export default UserSchema;