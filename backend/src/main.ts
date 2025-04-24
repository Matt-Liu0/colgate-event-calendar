import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  // Verify DATABASE_URL is loaded
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  console.log('Database URL:', process.env.DATABASE_URL);
  
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5005);
}
bootstrap();