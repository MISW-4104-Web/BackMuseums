import { Injectable } from '@nestjs/common';
import constants from '../auth/constants';

export type User = any;

@Injectable()
export class UsersService {
    private users = constants.BASE_USERS;
    
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
