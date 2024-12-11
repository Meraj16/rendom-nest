// import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsArray, IsMongoId } from 'class-validator';
// import { Types } from 'mongoose';

// export class CreateUserDto {
//   @IsNumber()
//   @IsNotEmpty()
//   username: string;

//   @IsNumber()
//   @IsNotEmpty()
//   password: string;

//   @IsString()
//   @IsEnum(['admin', 'team_member'])
//   @IsNotEmpty()
//   user_type: string;

//   @IsString()
//   @IsEnum(['active', 'deleted'])
//   @IsNotEmpty()
//   status: string;

//   @IsString()
//   @IsOptional()
//   firebase_uid?: string;

//   // @IsArray()
//   // @IsOptional()
//   // @IsMongoId({ each: true })
//   // companies?: Types.ObjectId[];

//   @IsMongoId()
//   @IsOptional()
//   parent?: Types.ObjectId;

//   @IsMongoId()
//   @IsOptional()
//   primary_company?: Types.ObjectId;

//   @IsMongoId()
//   @IsOptional()
//   parent_company?: Types.ObjectId;

//   @IsMongoId()
//   @IsOptional()
//   team_member_id?: Types.ObjectId;

//   @IsMongoId()
//   @IsOptional()
//   createdBy?: Types.ObjectId;
// }


import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsEnum(['admin', 'team_member'])
  @IsNotEmpty()
  user_type: string;

  @IsString()
  @IsEnum(['active', 'deleted'])
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  firebaseUid?: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  companies?: Types.ObjectId[];

  @IsMongoId()
  @IsOptional()
  parent?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  parent_company?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  team_member_id?: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  createdBy?: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  createdAt?: Date;
}

