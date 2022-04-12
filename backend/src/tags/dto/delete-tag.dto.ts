import { IsNumberString } from 'class-validator';

export class DeleteTagDto {
  @IsNumberString(undefined, { message: 'ID must be number' })
  id: string;
}
