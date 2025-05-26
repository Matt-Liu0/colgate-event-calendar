import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsController } from './comments/comments.controller';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
