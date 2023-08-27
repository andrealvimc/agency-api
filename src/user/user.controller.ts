import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { Roles } from 'src/authentication/roles.decorator';
import { Role } from 'src/authentication/enums';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { JwtAuthGuard } from 'src/authentication/guards/authentication.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get('/')
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const users = await this.userService.getAllUsers();

      const result = users.map((user) => {
        const { password, ...rest } = user;

        return rest;
      });
      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server error' });
    }
  }
}
