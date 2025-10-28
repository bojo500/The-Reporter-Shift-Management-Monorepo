import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SectionEnum, ThreeShift } from '../../libs/enums';

export class CreateShiftDto {
  @ApiProperty({ enum: ThreeShift, enumName: 'ThreeShift', description: 'Shift within the day' })
  @IsEnum(ThreeShift)
  shift: ThreeShift;

  @ApiProperty({ enum: SectionEnum, enumName: 'SectionEnum', description: 'Department/section of the shift' })
  @IsEnum(SectionEnum)
  section: SectionEnum;
}
