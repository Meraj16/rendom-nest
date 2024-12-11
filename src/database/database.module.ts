import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { Token, TokenSchema } from '../tokens/token.schema';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Token.name, schema: TokenSchema }
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }
