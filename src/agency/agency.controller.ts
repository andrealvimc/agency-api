/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AgencyService } from './agency.service';
import { Role } from 'src/authentication/enums';
import { Roles } from 'src/authentication/roles.decorator';
import { JwtAuthGuard } from 'src/authentication/guards/authentication.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UserReq } from 'src/user/user.decorator';
import { User } from 'src/user/user.model';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('agency')
export class AgencyController {
  constructor(private agencyService: AgencyService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get('')
  async getAgencies(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {

    const agencies = await this.agencyService.getAgencies();

    return response.status(200).json(agencies);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.AGENCY)
  @Get('/my-agencies')
  async getMyAgencies(
    @Req() request: Request,
    @Res() response: Response,
    @UserReq() user: User,
  ) {
    try {
     
      const agencies = await this.agencyService.getMyAgencies(user.email);

      return response.status(200).json(agencies);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.AGENCY, Role.ADMIN)
  @Get('/:id')
  async getAgencyById(@Req() request: Request,
    @Res() response: Response): Promise<any>{
    try {
      const { id } = request.params;

      const agency = await this.agencyService.getAgencyById(id);

      return response.status(200).json(agency);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post('')
  async createAgency(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createAgencyDto: CreateAgencyDto,
  ): Promise<any>{
    try {
      const result = await this.agencyService.createAgency(createAgencyDto);

      return response.status(200).json(result);

    } catch (error) {
      return response.status(400).json({ message: error.message });
    }

  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.AGENCY)
  @Post('/create-customer')
  async createCustomer( @Req() request: Request,
    @Res() response: Response,
    @UserReq() user: User,
    @Body() createCustomerDto: CreateCustomerDto,
    ): Promise<any>{
    try {
      const result = await this.agencyService.createCustomer(createCustomerDto);

      return response.status(200).json(result);

    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
