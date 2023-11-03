import { AccountService } from './account.service';
import { AccountController } from './account.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService, PrismaService, UserService],
})
export class AccountModule {}
