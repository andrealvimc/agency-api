import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const [email, password] = [loginDto.email, loginDto.password];

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const validatePass = await bcrypt.compare(password, user.password);

    if (!validatePass) {
      throw new NotFoundException('Password is incorrect');
    }

    return {
      token: this.jwtService.sign({ email, role: user.role }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    // prisma validation
    const createUser = new User();
    createUser.email = registerUserDto.email;
    createUser.name = registerUserDto.name;
    createUser.password = await bcrypt.hash(registerUserDto.password, 10);

    const user = await this.userService.create(createUser);

    return {
      token: this.jwtService.sign({ email: user.email, role: user.role }),
    };
  }

  // async logout() {}
}
