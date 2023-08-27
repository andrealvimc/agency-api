import { Prisma, User as UserPrisma } from '@prisma/client';

// "ADMIN" | "AGENCY" | "CUSTOMER" | "MANAGER" | "SELLER"
export class User implements Prisma.UserCreateInput {
  email: string;
  name: string;
  password: string;
  role: string;
}
