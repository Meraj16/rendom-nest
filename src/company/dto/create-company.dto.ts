import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsArray, IsMongoId, IsEmail } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCompanyDto {
    @IsNumber()
    @IsNotEmpty()
    name: string;

    @IsString()
    designation?: string;

    @IsString()
    @IsEnum(['active', 'deleted'])
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsOptional()
    business_name?: string;

    @IsString()
    @IsOptional()
    business_type?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    isPrimary?: boolean;

    @IsMongoId()
    @IsOptional()
    user?: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    createdBy?: Types.ObjectId;

}
