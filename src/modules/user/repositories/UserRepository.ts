import UserEntity from '@modules/user/infra/mongoose/entities/User';
import { Optional } from 'utility-types';
import { getModelForClass } from '@typegoose/typegoose';
import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import UserSchema from '@modules/user/infra/mongoose/entities/User';

interface UserDTO {
    name: string,
    email: string,
    passwordHash: string
}

class UserRepository {
    public async create({ name, email, passwordHash }: UserDTO): Promise<Optional<UserEntity, "passwordHash">> {
        const User = getModelForClass(UserEntity);
        const user = await User.create({ name, email, passwordHash });

        return user;
    }

    public async findByEmail(email: string) {
        const User = getModelForClass(UserEntity);
        const user = await User.findOne({ email });

        return user;
    }

    public async findById(_id: Ref<UserSchema, Types.ObjectId>) {
        const User = getModelForClass(UserEntity);
        const user = await User.findOne({ _id });

        return user;
    }

    public async findAll(): Promise<UserDTO[]> {
        const User = getModelForClass(UserEntity);
        const users = await User.find();

        return users;
    }
}

export default UserRepository;