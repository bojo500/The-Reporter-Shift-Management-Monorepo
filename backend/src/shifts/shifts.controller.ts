import { Controller, Post, Get, Body } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  createShift(@Body() body: CreateShiftDto & { userId: number }) {
    return this.shiftsService.createShift({ id: body.userId }, body);
  }

  @Get()
  findAll() {
    return this.shiftsService.findAll();
  }
}
