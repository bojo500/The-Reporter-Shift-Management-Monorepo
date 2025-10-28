import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CcsEntity } from './entities';
import { CreateCcsDto } from './dto';
import { User } from '../users/entities';
import { Shift } from '../shifts/entities';

@Injectable()
export class CcsService {
  constructor(
    @InjectRepository(CcsEntity)
    private readonly ccsRepository: Repository<CcsEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async create(dto: CreateCcsDto) {
    const { userId, shiftId, ...ccsData } = dto;

    // Fetch the User and Shift entities
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const shift = await this.shiftRepository.findOne({ where: { id: shiftId } });

    if (!user) {
      throw new Error('User not found');
    }
    if (!shift) {
      throw new Error('Shift not found');
    }

    // Create CCS record with proper relations
    const record = this.ccsRepository.create({
      ...ccsData,
      user,
      shift,
    });

    return this.ccsRepository.save(record);
  }

  findAll() {
    return this.ccsRepository.find();
  }

  findOne(id: number) {
    return this.ccsRepository.findOne({ where: { id } });
  }
}
