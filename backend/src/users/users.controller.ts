import { Controller,Get,Param,ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.findOneById(id);
    }

    @Get()
    async getAllUsers() {
        return this.usersService.findAll();
    }
}
