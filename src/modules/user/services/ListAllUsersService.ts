import UserRepository from '@modules/user/repositories/UserRepository';

interface ResponseUser {
    name: string;
    email: string;
}

class ListAllUsersService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async run(): Promise<ResponseUser[]> {

        const users = await this.userRepository.findAll();

        return users;
    }
}

export default ListAllUsersService;