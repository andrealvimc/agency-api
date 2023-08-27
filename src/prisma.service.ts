/* eslint-disable @typescript-eslint/ban-ts-comment */
import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-ignore
    this.$on('beforeExt', async () => {
      await app.close();
    });
  }
}
