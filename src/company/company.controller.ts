// import { Controller, Get, Post, Body, Param, Delete, Patch, Request, Res } from '@nestjs/common';
// // import { UsersService } from './companies.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
// import { ResponseHandler } from 'src/common/response.handler';
// import { Response } from 'express';

// import { UsersService } from 'src/companies/companies.service';

// @Controller('company')
// export class UsersController {
//   constructor(private readonly companiesService: UsersService) {}

//   @Post()
//   async create(@Body() createUserDto: CreateCompanyDto, @Res() res: Response) {
//     try {
//       const newUser = await this.companiesService.create(createUserDto);
//       return ResponseHandler.created(res, newUser, 'USER_CREATED');
//     } catch (error) {
//       return ResponseHandler.internalServerError(res, 'ERROR_CREATING_USER');
//     }
//   }

// //   @Get()
// //   async findAll(@Res() res: Response) {
// //     try {
// //       const companies = await this.companiesService.findAll();
// //       return ResponseHandler.success(res, companies, 'USERS_RETRIEVED');
// //     } catch (error) {
// //       return ResponseHandler.internalServerError(res, 'ERROR_RETRIEVING_USERS');
// //     }
// //   }

//   @Get(':id')
//   async findOne(@Param('id') id: string, @Res() res: Response) {
//     try {
//       const user = await this.companiesService.findOneById(id);
//       if (!user) {
//         return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
//       }
//       return ResponseHandler.success(res, user, 'USER_RETRIEVED');
//     } catch (error) {
//       return ResponseHandler.internalServerError(res, 'ERROR_RETRIEVING_USER');
//     }
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateUserDto: UpdateCompanyDto, @Res() res: Response) {
//     try {
//       const updatedUser = await this.companiesService.update(id, updateUserDto);
//       if (!updatedUser) {
//         return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
//       }
//       return ResponseHandler.success(res, updatedUser, 'USER_UPDATED');
//     } catch (error) {
//       return ResponseHandler.internalServerError(res, 'ERROR_UPDATING_USER');
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string, @Res() res: Response) {
//     try {
//       const result = await this.companiesService.remove(id);
//       if (!result) {
//         return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
//       }
//       return ResponseHandler.success(res, null, 'USER_DELETED');
//     } catch (error) {
//       return ResponseHandler.internalServerError(res, 'ERROR_DELETING_USER');
//     }
//   }

//   @Pu(':id')
//   async update(@Param('id') id: string, @Body() updateUserDto: UpdateCompanyDto, @Res() res: Response) {
//     try {
//       const updatedUser = await this.companiesService.update(id, updateUserDto);
//       if (!updatedUser) {
//         return ResponseHandler.notFound(res, 'USER_NOT_FOUND');
//       }
//       return ResponseHandler.success(res, updatedUser, 'USER_UPDATED');
//     } catch (error) {
//       return ResponseHandler.internalServerError(res, 'ERROR_UPDATING_USER');
//     }
//   }
// }
