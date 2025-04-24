import { Controller, Get, Post, Body, Request, UseGuards} from '@nestjs/common';
import { containsProfanity, cleanProfanity } from '../utils/wordFilter';
import { AuthGuard } from '@nestjs/passport';


@Controller('comments')
export class CommentsController {
    //public 
    @Get()
    findAll() {/*....*/}

    @Post()
    async addComment(@Body() body: { eventId: string; text: string }) {
    const { text } = body;

    if (containsProfanity(text)) {
      return {
        success: false,
        message: 'Your comment contains inappropriate language.',
        cleaned: cleanProfanity(text), // optional: show a cleaned version
      };
    }

    // Save comment to DB or process it
    return {
      success: true,
      message: 'Comment accepted!',
    };
  }

    //protected
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Request() req, @Body() dto: {text: string}) {
        // req.user = {userId, email}
        /*....*/
    }
}
