import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Delete,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from './tag.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { Response } from 'express';
import { TagsService } from './tags.service';
import { DeleteTagDto } from './dto/delete-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Post()
  async createTag(@Res() res: Response, @Body() body: CreateTagDto) {
    const { id, name } = await this.tagsService.create(body);
    res
      .status(HttpStatus.CREATED)
      .json({ id: id, name: name, status: 'executed' });
  }

  @Get()
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Tag>> {
    limit = limit > 50 ? 50 : limit;

    return this.tagsService.search({
      page,
      limit,
    });
  }

  @Delete('/:id')
  async removeTag(@Res() res: Response, @Param() dto: DeleteTagDto) {
    const tag = await this.tagsService.findOneById(parseInt(dto.id));
    if (!tag) {
      throw new NotFoundException('Tag does not exist');
    }
    await this.tagsService.remove(parseInt(dto.id));

    return res.status(204).send();
  }
}
