import { PartialType } from '@nestjs/swagger';
import { CreateCcsDto } from './create-ccs.dto';

export class UpdateCcsDto extends PartialType(CreateCcsDto) {}
