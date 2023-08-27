import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';

@Module({
  providers: [UserService, PrismaService, AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
