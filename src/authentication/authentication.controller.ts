import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

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
      return response.status(400).json({ message: error.message });
    }
  }
}
