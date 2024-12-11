import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseService } from './database/database.service';
import { LoggerService } from './logger/logger.service';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    // CacheModule.register({
    //   isGlobal: true,
    //   ttl: 600, // Default TTL (10 minutes)
    //   max: 100,
    // }),
    UsersModule,
    AuthModule,
  ],
  providers: [DatabaseService, LoggerService,
    // {
    //   provide: APP_GUARD,
    //   useFactory: (reflector: Reflector) => new RolesGuard(reflector),
    //   inject: [Reflector],
    // },

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
