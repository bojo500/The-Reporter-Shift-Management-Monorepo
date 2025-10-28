import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { CoreEntity } from '../../libs/entities';
import { SectionEnum } from '../../libs/enums';
import { Shift } from '../../shifts/entities';

@Entity('users')
export class User  extends CoreEntity{
  @ApiProperty({
    description: 'The full name of the users',
    example: 'Mohamed Khaled',
  })
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    description: 'The email address of the users',
    example: 'mohamed@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    description: 'The phone number of the users',
    example: '+201234567890',
  })
  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: 'enum',
    enum: SectionEnum,
    nullable: true,
  })
  section: SectionEnum;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];

}
