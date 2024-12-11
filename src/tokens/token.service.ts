// src/tokens/token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from './token.schema';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>) {}

  // Save or update a refresh token
  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.tokenModel.findOneAndUpdate({ userId }, { refreshToken }, { upsert: true });
  }

  // Find a refresh token by userId
  async findRefreshToken(userId: string): Promise<string | null> {
    const token = await this.tokenModel.findOne({ userId }).exec();
    return token?.refreshToken || null;
  }

  // Delete a refresh token by userId
  async deleteRefreshToken(userId: string): Promise<void> {
    await this.tokenModel.deleteOne({ userId }).exec();
  }
}
