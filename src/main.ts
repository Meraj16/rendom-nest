import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Obtain MongoDB URI from configuration
  const configService = app.get(ConfigService);
  const mongoUri = configService.get<string>('MONGODB_URI');

  // Configure the MongooseModule in AppModule
  // MongooseModule.forRoot(mongoUri) is called in the AppModule, so no need to do it here again
  
  // Start the application
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  await app.listen(4000);
  console.log('Application is running on: 4000');

  // Handle HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
