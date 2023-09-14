import { Prisma } from '@prisma/client';

export class Agency implements Prisma.AgencyCreateInput {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  document: string;
  nameFantasy: string;
}
