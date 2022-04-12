import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be string' })
  @MinLength(1)
  @MaxLength(20)
  name: string;
}
