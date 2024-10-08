import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id?: string;
  userId?: string;
  email: string;
  name: string;
  password: string;
  role: string;
  cpf: string;
  address: string;
  phone: string;
  agencyId?: string;
  agencyRole?: string;
  accountId?: string;
}
