import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
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
}
