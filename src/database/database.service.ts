import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DB_MESSAGES } from 'src/config/messages';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @InjectConnection() private connection: Connection,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
) {}

  async onModuleInit() {
    await this.checkConnection();
  }

  async onModuleDestroy() {
    await this.connection.close();
    this.logger.log('MongoDB disconnected');
  }

  async checkConnection() {
    try {
      const connectionState = this.connection.readyState;
      
      if (connectionState === 1) {
        this.logger.log(DB_MESSAGES.connected);
        this.loggerService.log(DB_MESSAGES.connected);
      } else {
        this.logger.warn(DB_MESSAGES.notConnected, connectionState);
        this.loggerService.warn(DB_MESSAGES.notConnected, connectionState);
      }
    } catch (error) {
      this.logger.error(DB_MESSAGES.connectionError, error);
      this.loggerService.error(DB_MESSAGES.connectionError, error);
    }
  }

  getConnection(): Connection {
    return this.connection;
  }
}