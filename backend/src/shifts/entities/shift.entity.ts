import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities';
import { CoreEntity } from '../../libs/entities';
import { SectionEnum, ThreeShift } from '../../libs/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Shifts')
export class Shift extends CoreEntity {


  @ApiProperty({ enum: ThreeShift, enumName: 'ThreeShift' })
  @Column({
    type: 'enum',
    enum: ThreeShift,
  })
  shift: ThreeShift;

  @ApiProperty({ enum: SectionEnum, enumName: 'SectionEnum' })
  @Column({
    type: 'enum',
    enum: SectionEnum,
  })
  section: SectionEnum;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.shifts, { onDelete: 'CASCADE' })
  user: User;

}
