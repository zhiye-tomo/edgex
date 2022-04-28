import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({ message: 'Name must not be empty' })
  @IsString({ message: 'Name must be string' })
  @MinLength(1)
  @MaxLength(50)
  name: string;
}
