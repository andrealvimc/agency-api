/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';


@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getCategories(): Promise<any> {
    const categories = await this.prismaService.category.findMany()

    return categories;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    const { name } = createCategoryDto;

    const hasExistsCategory = await this.prismaService.category.findUnique({
      where: {
        name
      }
    })

    if(hasExistsCategory) throw new Error('Agency already exists');

    const category = await this.prismaService.category.create({
      data: {
        name,
      },
    });

    return category;
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const category = await this.prismaService.category.findUnique({
      where: {
        id: categoryId
      }
    })

    if(!category) throw new Error('Category not found');

    return category
  }
}
