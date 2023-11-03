import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleGuard } from './authentication/guards/role.guard';
import { AgencyModule } from './agency/agency.module';
import { CreativeModule } from './creative/creative.module';

@Module({
  imports: [
    AccountModule,
    CreativeModule,
    CategoryModule,
    UserModule,
    AuthenticationModule,
    AgencyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'role',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
