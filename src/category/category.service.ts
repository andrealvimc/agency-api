/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoryService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async getCategories(): Promise<any> {
    return await this.prismaService.category.findMany();
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
}
