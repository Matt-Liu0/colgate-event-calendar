import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private users = [];

    async findOneByEmail(email: string) {
        return this.users.find(user => user.email === email);
    }
    async create(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { email, password: hashedPassword };
        this.users.push(newUser);
        return newUser;
    }
}

