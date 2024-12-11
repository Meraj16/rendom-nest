import { Controller, Get, Post, Body, Param, Delete, Patch, Res, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseHandler } from 'src/common/response.handler';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      return ResponseHandler.success(res, users, 'USERS_RETRIEVED');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'ERROR_RETRIEVING_USERS');
    }
  }

  // @Public()
  @Get(':id')
  // @Roles('team_member')
  // @UseGuards(RolesGuard)
  async findOne(@Param('id') id: string,@Req() req: Request, @Res() res: Response) {
    try {
      console.log("======>req",req['user'])
      const user = await this.usersService.findOneById(id);
      if (!user) {
        return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
      }
      return ResponseHandler.success(res, user, 'USER_RETRIEVED');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'ERROR_RETRIEVING_USER');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      if (!updatedUser) {
        return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
      }
      return ResponseHandler.success(res, updatedUser, 'USER_UPDATED');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'ERROR_UPDATING_USER');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.usersService.remove(id);
      if (!result) {
        return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
      }
      return ResponseHandler.success(res, null, 'USER_DELETED');
    } catch (error) {
      return ResponseHandler.internalServerError(res, 'ERROR_DELETING_USER');
    }
  }
}
