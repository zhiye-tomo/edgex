import { Transform } from 'class-transformer';
import { IsNumberString, IsInt, NotEquals } from 'class-validator';

export class DeleteTagDto {
  @IsNumberString(undefined, { message: 'id must be number' })
  id: string;
}

export class GetTagsDto {
  @IsInt({ message: 'page must be number' })
  @Transform(({ value }) => Number(value))
  @NotEquals(0)
  page: number;

  @IsInt({ message: 'limit must be number' })
  @Transform(({ value }) => Number(value))
  limit: number;
}
