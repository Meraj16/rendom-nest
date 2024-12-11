// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenService } from '../tokens/token.service'; // Import TokenService
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService, // Inject TokenService
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: this.configService.get<string>('JWT_EXPIRATION') });
    const refreshToken = this.jwtService.sign(payload, { secret: this.refreshTokenSecret, expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') });

    // Save refreshToken in the token collection
    await this.tokenService.saveRefreshToken(user._id, refreshToken);

    const { password, ...rest } = user;

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: rest
    };
  }

  async refreshTokens(userId: string, oldRefreshToken: string) {
    try {
      // Verify the old refresh token
      const payload = this.jwtService.verify(oldRefreshToken, { secret: this.refreshTokenSecret });
      if (payload.sub !== userId) {
        throw new Error('Invalid token');
      }

      // Generate new tokens
      const newAccessToken = this.jwtService.sign({ username: payload.username, sub: payload.sub }, { secret: this.jwtSecret, expiresIn: this.configService.get<string>('JWT_EXPIRATION') });
      const newRefreshToken = this.jwtService.sign({ username: payload.username, sub: payload.sub }, { secret: this.refreshTokenSecret, expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION') });

      // Save new refresh token in the token collection and invalidate the old one
      await this.tokenService.saveRefreshToken(userId, newRefreshToken);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async register(userDto: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = {
      ...userDto,
      password: hashedPassword,
    };
    // Assuming usersService has a method to create a new user
    return this.usersService.create(newUser);
  }
}
