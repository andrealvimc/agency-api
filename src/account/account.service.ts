import { PrismaService } from './../prisma.service';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createAccount(createAccountDto: CreateAccountDto) {
    const { domain, colors, logo, emails } = createAccountDto;

    const hasExistingAccount = await this.prismaService.account.findUnique({
      where: {
        domain,
      },
    });

    if (hasExistingAccount) throw new Error('Account already exists');

    const account = await this.prismaService.account.create({
      data: {
        domain,
        colors,
        logo,
        alerts: true,
      },
    });

    emails.map(async (email) => {
      const user = await this.userService.getUserByEmail(email);

      await this.addAccountToUser(user.id, account.id);
    });

    return account;
  }

  async addAccountToUser(userId: string, accountId: string) {
    const user = await this.userService.getUserById(userId);

    if (!user) throw new Error('User not found');

    if (user.accountId) throw new Error('User already has an account');

    const updatedUser = await this.userService.updateUser(userId, {
      ...user,
      accountId,
    });

    return updatedUser;
  }
}
