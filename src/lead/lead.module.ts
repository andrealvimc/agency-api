import { LeadController } from './lead.controller';
import { PrismaService } from 'src/prisma.service';
import { LeadService } from './lead.service';
import { Module } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [LeadController],
  providers: [LeadService, PrismaService, AccountService, UserService],
})
export class LeadModule {}
