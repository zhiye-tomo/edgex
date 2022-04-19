import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Response } from 'express';
import { TagsService } from './tags.service';
import { DeleteTagDto } from './dto/query.dto';
import { GetTagsDto } from './dto/query.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Post()
  async createTag(@Res() res: Response, @Body() body: CreateTagDto) {
    const { id, name } = await this.tagsService.create(body);
    return res.status(HttpStatus.CREATED).json({
      id,
      name,
    });
  }

  @Get()
  async getTags(@Res() res: Response, @Query() dto: GetTagsDto) {
    let { page = 1, limit = 1 } = dto;

    limit = limit > 50 ? 50 : limit;

    const tags = await this.tagsService.search({
      page,
      limit,
    });

    return res.status(HttpStatus.OK).json(tags);
  }

  @Delete('/:id')
  async removeTag(@Res() res: Response, @Param() dto: DeleteTagDto) {
    const tag = await this.tagsService.findOneById(parseInt(dto.id));
    if (!tag) {
      throw new NotFoundException(['Tag does not exist']);
    }
    await this.tagsService.remove(parseInt(dto.id));

    return res.status(HttpStatus.OK).json({
      message: 'Deleted successfully',
    });
  }
}
