import { CoreEntity } from '../../libs/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities';
import { Shift } from '../../shifts/entities';
import { SectionEnum } from '../../libs/enums';

@Entity('CCS')
export class CcsEntity extends CoreEntity{
  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Shift, { eager: true })
  shift: Shift;

  @Column({
    type: 'enum',
    enum: SectionEnum,
  })
  section: SectionEnum;

  @Column()
  baf_in: number;

  @Column()
  baf_out: number;

  @Column()
  crm_in: number;

  @Column()
  crm_out: number;

  @Column()
  shipped_out: number;

  @Column()
  tugger_in : number;

  @Column()
  tugger_off: number;

  @Column()
  totalTrucksIn: number;

  @Column()
  totalTrucksOut: number;

  @Column()
  totalMovements: number;

  @Column()
  totalTrucks: number;

  @Column()
  hook: number;

  @Column()
  downTime: number;

  @Column()
  movedOfShipping: number;

  @Column()
  slitter_on: number;

  @Column()
  slitter_off: number;

  @Column()
  coils_hatted: number;

}
