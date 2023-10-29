import { CreativeService } from './creative.service';
import { CreativeController } from './creative.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/category/category.service';

@Module({
    imports: [],
    controllers: [CreativeController],
    providers: [
        CategoryService,
        CreativeService, 
        PrismaService
    ],
})
export class CreativeModule { }
