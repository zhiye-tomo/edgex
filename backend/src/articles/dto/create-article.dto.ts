import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  // @IsNotEmpty()
  // userId: number;

  // @IsNotEmpty()
  // author: string;

  @IsNotEmpty()
  users: Array<User>;
}
