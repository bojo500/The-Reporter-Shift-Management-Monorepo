import { Module } from '@nestjs/common';
import { CcsService } from './ccs.service';
import { CcsController } from './ccs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CcsEntity } from './entities';
import { User } from '../users/entities';
import { Shift } from '../shifts/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CcsEntity, User, Shift])],
  controllers: [CcsController],
  providers: [CcsService],
  exports: [CcsService],
})
export class CcsModule {}
