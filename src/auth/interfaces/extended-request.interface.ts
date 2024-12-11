// src/auth/interfaces/extended-request.interface.ts
import { Request } from 'express';
import { User } from './user.interface';

export interface ExtendedRequest extends Request {
  user?: User; // Add user property to Request
}
