import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.listen(3000);

    console.log(`Database connection successful. Use port: 3000`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
bootstrap();
