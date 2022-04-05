import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Delete,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Response } from 'express';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}
  @Post()
  async createTag(@Res() res: Response, @Body() body: CreateTagDto) {
    const { id, name } = await this.tagsService.create(body);
    res.status(HttpStatus.CREATED).json({ tag: { id: id, name: name } });
  }

  @Get()
  async getAllTags(@Res() res: Response) {
    const tags = await this.tagsService.find();

    res.status(HttpStatus.OK).json({ tags: tags });
  }

  @Delete('/:id')
  removeTag(@Res() res: Response, @Param('id') id: string) {
    this.tagsService.remove(parseInt(id));
    res.json(null);
  }
}
