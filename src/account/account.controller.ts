import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { Role } from 'src/authentication/enums';
import { JwtAuthGuard } from 'src/authentication/guards/authentication.guard';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN, Role.AGENCY, Role.MANAGER)
  @Post('')
  async createAccount(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<any> {
    try {
      const result = await this.accountService.createAccount(createAccountDto);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
