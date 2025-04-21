import { Controller, Post, Body, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    singup(@Body() dto: {email: string, password: string}) {
        return this.authService.signup(dto.email, dto.password);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }
}
