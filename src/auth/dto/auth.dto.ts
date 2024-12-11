// src/auth/dto/auth.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firebase_uid: string;

  @IsString()
  password: string;
}

export class RefreshDto {
  @IsString()
  refresh_token: string;
}
