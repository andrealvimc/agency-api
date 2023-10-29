
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
import { CreativeService } from './creative.service';
import { JwtAuthGuard } from 'src/authentication/guards/authentication.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/enums';
import { CreateCreativeDto } from './dto/create-creative.dto';


@Controller('creative')
export class CreativeController {

  constructor(
    private creativeService: CreativeService,
  ) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async createCreative( 
    @Req() request: Request,
    @Res() response: Response,
    @Body() createCreativeDto: CreateCreativeDto,
  ): Promise<any> {
    try {
      const result = await this.creativeService.createCreative(
        createCreativeDto,
      );
      
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }


  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.AGENCY, Role.MANAGER)
  @Get('')
  async getCreatives(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const agencies = await this.creativeService.getCreatives();

    return response.status(200).json(agencies);
  }
}
