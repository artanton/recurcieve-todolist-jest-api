import { IsNumber, IsString } from 'class-validator';

export class PostTaskDto {
  @IsString()
  text: string;
  @IsString()
  date: string;
  @IsString()
  parentId: string;
  @IsNumber()
  subLevel: number;
}
