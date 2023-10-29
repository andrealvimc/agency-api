import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCreativeDto } from './dto/create-creative.dto';
import { CategoryService } from 'src/category/category.service';
import { Creative } from '@prisma/client';

@Injectable()
export class CreativeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async getCreatives(): Promise<any> {
    const creatives = await this.prismaService.creative.findMany();

    const creativesWithCategoryName: Creative[] = await Promise.all(creatives.map(async (creative) => {
      const category = await this.categoryService.getCategoryById(creative.categoryId);

      return {
        ...creative,
        category: category.name,
      };
    }));


    return creativesWithCategoryName;
  }


  async createCreative(createCreativeDto: CreateCreativeDto): Promise<any> { 
    const { name, format, categoryId } = createCreativeDto;

     const creative = await this.prismaService.creative.create({
      data: {
        name,
        categoryId,
        format,
      },
    });


    return creative
  }
}
