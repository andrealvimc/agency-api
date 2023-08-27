import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleGuard } from './authentication/guards/role.guard';

@Module({
  imports: [UserModule, AuthenticationModule],
  controllers: [],
  providers: [
    {
      provide: 'role',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
