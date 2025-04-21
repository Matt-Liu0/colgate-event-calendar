import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users = []; // TODO: swap for Prisma/DB

    //AuthService.validateUser
  async findOneByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  //AuthService.login 
  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id)
  }

  //AuthService.signup
  async create(email: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = { id: Date.now(), email, password: hash };
    this.users.push(user);
    return user;
  }

  /** Expose user list without passwords */
  async findAllPublic(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...rest }) => rest)
  }
}


