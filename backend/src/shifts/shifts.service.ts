import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './entities';
import { CcsEntity } from '../ccs/entities';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepo: Repository<Shift>,
  ) {}

  async createShift(user: { id: any }, data: Partial<Shift>) {
    // Create and save the shift
    const shift = this.shiftRepo.create({ ...data, user });
    const savedShift = await this.shiftRepo.save(shift);

    // Create corresponding CCS entity with zero-initialized metrics
    const ccsRepo = this.shiftRepo.manager.getRepository(CcsEntity);
    const ccs = ccsRepo.create({
      user: savedShift.user,
      shift: savedShift,
      section: savedShift.section as any,

      baf_in: 0,
      baf_out: 0,
      crm_in: 0,
      crm_out: 0,
      shipped_out: 0,
      tugger_in: 0,
      tugger_off: 0,
      totalTrucksIn: 0,
      totalTrucksOut: 0,
      totalMovements: 0,
      totalTrucks: 0,
      hook: 0,
      downTime: 0,
      movedOfShipping: 0,
      slitter_on: 0,
      slitter_off: 0,
      coils_hatted: 0,
    });
    await ccsRepo.save(ccs);

    return savedShift;
  }

  findAll() {
    return this.shiftRepo.find({ relations: ['user', 'reports'] });
  }

  findByUser(userId: number) {
    return this.shiftRepo.find({
      where: { user: { id: userId } },
      relations: ['reports'],
    });
  }
}
