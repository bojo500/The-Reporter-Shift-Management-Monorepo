import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber } from 'class-validator';
import { SectionEnum } from '../../libs/enums';

export class CreateCcsDto {
  @ApiProperty({ enum: SectionEnum })
  @IsEnum(SectionEnum)
  section: SectionEnum;

  @ApiProperty({ description: 'Shift ID' })
  @IsNumber()
  shiftId: number; // <-- change from ThreeShift to Shift entity ID

  @ApiProperty({ description: 'User ID' })
  @IsNumber()
  userId: number; // optional if assigning current users

  @ApiProperty()
  @IsInt()
  baf_in: number;

  @ApiProperty()
  @IsInt()
  baf_out: number;

  @ApiProperty()
  @IsInt()
  crm_in: number;

  @ApiProperty()
  @IsInt()
  crm_out: number;

  @ApiProperty()
  @IsInt()
  shipped_out: number;

  @ApiProperty()
  @IsInt()
  tugger_in: number;

  @ApiProperty()
  @IsInt()
  tugger_off: number;

  @ApiProperty()
  @IsInt()
  totalTrucksIn: number;

  @ApiProperty()
  @IsInt()
  totalTrucksOut: number;

  @ApiProperty()
  @IsInt()
  totalMovements: number;

  @ApiProperty()
  @IsInt()
  totalTrucks: number;

  @ApiProperty()
  @IsInt()
  hook: number;

  @ApiProperty()
  @IsInt()
  downTime: number;

  @ApiProperty()
  @IsInt()
  movedOfShipping: number;

  @ApiProperty()
  @IsInt()
  slitter_on: number;

  @ApiProperty()
  @IsInt()
  slitter_off: number;

  @ApiProperty()
  @IsInt()
  coils_hatted: number;
}
