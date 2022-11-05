import { IsNotEmpty, IsDate, IsString, MaxLength } from 'class-validator';

export class CreateTodoDTO {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  time: Date;

  @IsString()
  status: string;
}
