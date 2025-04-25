import { Injectable } from '@nestjs/common';
import {JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwt: JwtService,
    ){}

    async validateUser(email: string, pass: string){// check for error here later
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const {password, ...safe} = user; 
            return safe;
        }
        return null;
    }

    async signup(email: string, password: string) {
        const user = await this.usersService.create(email,password);
        return this.login(user);
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwt.sign(payload),
        };
    }
}
