import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/authentication.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './roles.decorator';
import { Role } from './enums';

@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Post('/register')
  async register(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerUserDto);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: error.message }); //'Internal Server error'
    }
  }
}
