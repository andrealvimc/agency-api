import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Role } from 'src/authentication/enums';
import { User } from 'src/user/user.model';

@Injectable()
export class AgencyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAgencies(): Promise<any> {
    return await this.prismaService.agency.findMany();
  }

  async getMyAgencies(email: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);

    const agencies = await this.prismaService.agency.findMany({
      where: { ownerId: user.id },
    });

    if (agencies.length < 0) {
      return [];
    }

    return agencies;
  }

  async createAgency(createAgencyDto: CreateAgencyDto): Promise<any> {
    const createAgency = new CreateAgencyDto();
    createAgency.name = createAgencyDto.name;
    createAgency.email = createAgencyDto.email;
    createAgency.document = createAgencyDto.document;
    createAgency.phone = createAgencyDto.phone;
    createAgency.address = createAgencyDto.address;
    createAgency.ownerEmail = createAgencyDto.ownerEmail;
    createAgency.nameFantasy = createAgencyDto.nameFantasy;

    const hasExistsAgency = await this.prismaService.agency.findUnique({
      where: { document: createAgency.document },
    });

    if (hasExistsAgency) {
      throw new Error('Agency already exists');
    }

    const hasExistsUser = await this.prismaService.user.findUnique({
      where: { email: createAgency.ownerEmail },
    });

    if (!hasExistsUser) {
      throw new Error('User not found');
    }

    const agency = await this.prismaService.agency.create({
      data: {
        name: createAgency.name,
        email: createAgency.email,
        document: createAgency.document,
        nameFantasy: createAgency.nameFantasy,
        phone: createAgency.phone,
        address: createAgency.address,
        ownerId: hasExistsUser.id,
      },
    });

    await this.prismaService.user.update({
      where: { id: hasExistsUser.id },
      data: { agencyId: agency.id, agencyRole: 'manager' },
    });

    return agency;
  }

  async getAgencyById(id: string): Promise<any> {
    const agency = await this.prismaService.agency.findUnique({
      where: { id },
    });

    if (!agency) {
      throw new Error('Agency not found');
    }

    return agency;
  }

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<any> {
    const createCustomer = new CreateCustomerDto();
    createCustomer.name = createCustomerDto.name;
    createCustomer.email = createCustomerDto.email;
    createCustomer.cpf = createCustomerDto.cpf;
    createCustomer.agencyId = createCustomerDto.agencyId;
    createCustomer.agencyRole = createCustomerDto.agencyRole;

    const user = await this.userService.getUserByEmail(createCustomer.email);

    if (user) {
      throw new Error('Email already exists');
    }

    const password = Math.random().toString(36).slice(-12);

    const data: User = {
      email: createCustomer.email,
      name: createCustomer.name,
      cpf: createCustomer.cpf,
      agencyId: createCustomer.agencyId,
      address: '',
      phone: '',
      password: await bcrypt.hash(password, 10),
      role: Role.CUSTOMER,
      agencyRole: 'seller',
    };

    const customer = await this.userService.create(data);

    // TODO: ENVIAR SENHA POR EMAIL PARA O CLIENTE ACESSAR A PLATAFORMA

    return {
      email: customer.email,
      password,
    };
  }
}
