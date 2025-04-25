import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import { User } from '../../generated/prisma'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

    //AuthService.validateUser
    async findOneByEmail(email: string): Promise<User | null> {
      return this.prisma.user.findUnique({ where: { email } });
    }

  //AuthService.login 
  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  //AuthService.signup
  async create(email: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hash },
    });
  }

  /** Expose user list without passwords */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    return users.map(({ password, ...rest }) => rest);
  }

}


