import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsController } from './comments/comments.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
