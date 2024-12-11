// src/logger/logger.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    // Implement custom logic here, like writing to a file or sending to a logging server
    console.log(message);
  }

  error(message: string, trace: string) {
    // Implement custom error handling logic here
    console.error(message, trace);
  }

  warn(message: string, trace: any) {
    // Implement custom warning handling logic here
    console.warn(message, trace);
  }
}
