import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
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
  async getAllTags(@Res() res: Response) {
    const tags = await this.tagService.find();

    res.status(HttpStatus.OK).json({ tags: tags });
  }

  @Delete('/:id')
  removeTag(@Res() res: Response, @Param('id') id: string) {
    this.tagService.remove(parseInt(id));
    res.json(null);
  }
}
