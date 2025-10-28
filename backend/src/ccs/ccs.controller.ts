import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CcsService } from './ccs.service';
import { CreateCcsDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CcsEntity } from './entities';

@ApiTags('CCS')
@Controller('ccs')
export class CcsController {
  constructor(private readonly ccsService: CcsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a CCS record' })
  @ApiResponse({ status: 201, description: 'CCS record created', type: CcsEntity })
  create(@Body() dto: CreateCcsDto) {
    return this.ccsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a CCS record by ID' })
  @ApiResponse({ status: 200, description: 'CCS record', type: CcsEntity })
  findOne(@Param('id') id: number) {
    return this.ccsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all CCS records' })
  @ApiResponse({ status: 200, description: 'List of CCS records', type: [CcsEntity] })
  findAll() {
    return this.ccsService.findAll();
  }
}
