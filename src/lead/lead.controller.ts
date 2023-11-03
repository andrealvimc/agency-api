import { LeadService } from './lead.service';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('lead')
export class LeadController {
  constructor(private leadService: LeadService) {}

  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(Role.ADMIN, Role.AGENCY, Role.MANAGER)
  @Post('')
  async creteLead(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createLeadDto: CreateLeadDto,
  ): Promise<any> {
    try {
      const domain = request.headers.origin.split('https://')[1];

      console.log(domain, 'domain');

      const result = await this.leadService.createLead(createLeadDto, domain);

      return response.status(200).json({ message: result });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
