import { IsString } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';

export class UpdateTaskDto {
  @IsString()
  text: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
