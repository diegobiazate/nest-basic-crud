import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(clientDto: CreateClientDto) {
    const client = this.clientRepository.create(clientDto);
    return await this.clientRepository.save(client);
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: string) {
    return await this.clientRepository.findOneBy({ id });
  }

  async update(id: string, updateDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) return null;
    this.clientRepository.merge(client, updateDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: string) {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) return null;
    return await this.clientRepository.remove(client);
  }
}
