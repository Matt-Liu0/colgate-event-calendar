import { Controller, Get, Post, Body, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('comments')
export class CommentsController {
    //public 
    @Get()
    findAll() {/*....*/}

    //protected
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() dto: {text: string}) {
        // req.user = {userId, email}
        /*....*/
    }
}
