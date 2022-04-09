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
} from '@nestjs/common';
import { Tag } from './tag.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateTagDto } from './dto/create-tag.dto';
import { Response } from 'express';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}
  @Post()
  async createTag(@Res() res: Response, @Body() body: CreateTagDto) {
    const { id, name } = await this.tagService.create(body);

    res.status(HttpStatus.CREATED).json({ tag: { id: id, name: name } });
  }

  @Get()
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Tag>> {
    limit = limit > 50 ? 50 : limit;
    console.log('foo');

    return this.tagService.search({
      page,
      limit,
    });
  }

  @Delete('/:id')
  async removeTag(@Res() res: Response, @Param('id') id: string) {
    if (id) {
      await this.tagService.remove(parseInt(id));
      res.status(204).json(null);
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong',
    });
  }
}
