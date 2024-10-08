import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    return user;
  }

  async create(data: User): Promise<User> {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({ data });
  }

  async getMe(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  }

  async updateUser(userId: string, data: User) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });

    return user;
  }
}
