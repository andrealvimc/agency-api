import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuditMiddleware } from 'src/middlewares/audit.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
// audit logs middleware
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes(UserController);
  }
}
