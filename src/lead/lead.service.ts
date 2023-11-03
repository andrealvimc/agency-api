/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LeadService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLead(createLeadDto: CreateLeadDto, domain: string) {
    const { email, name, phone } = createLeadDto;

    // TODO: ALTERAR PRO SERVICE DA ACCOUNT
    const hasAccountValid = await this.prismaService.account.findUnique({
      where: {
        domain,
      },
    });

    if (!hasAccountValid) {
      throw new Error('Invalid account');
    }

    const lead = await this.prismaService.lead.create({
      data: {
        email,
        name,
        phone,
        accountId: hasAccountValid.id,
      },
    });

    return lead;
  }
}
