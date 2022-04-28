import { Transform } from 'class-transformer';
import { IsNumberString, IsInt, NotEquals } from 'class-validator';

export class DeleteGroupDto {
  @IsNumberString(undefined, { message: 'id must be number' })
  id: string;
}

export class GetGroupssDto {
  @IsInt({ message: 'page must be number' })
  @Transform(({ value }) => Number(value))
  @NotEquals(0)
  page: number;

  @IsInt({ message: 'limit must be number' })
  @Transform(({ value }) => Number(value))
  limit: number;
}
