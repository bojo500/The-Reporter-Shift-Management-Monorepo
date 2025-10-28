import {CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

export class CoreEntity {
  @ApiProperty({type: Number, nullable: true, required: false})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({type: Date, nullable: true, required: false})
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({type: Date, nullable: true, required: false})
  @UpdateDateColumn()
  updatedDate: Date;

  @ApiProperty({type: Date, nullable: true, required: false})
  @DeleteDateColumn()
  deletedDate: Date;
}