import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [UserService, PrismaService, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
