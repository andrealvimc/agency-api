/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Request, Response } from 'express';

import { Role } from 'src/authentication/enums';
import { JwtAuthGuard } from 'src/authentication/guards/authentication.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async createCategory(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<any> {
    try {
      const result = await this.categoryService.createCategory(
        createCategoryDto,
      );

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.AGENCY, Role.MANAGER)
  @Get('')
  async getCategories(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const agencies = await this.categoryService.getCategories();

    return response.status(200).json(agencies);
  }

}
