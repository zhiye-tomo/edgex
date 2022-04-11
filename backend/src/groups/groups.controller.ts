import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  DefaultValuePipe,
  ParseIntPipe,
  Delete,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Response } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Group } from './group.entity';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  async createGroup(@Res() res: Response, @Body() body: CreateGroupDto) {
    const { id, name } = await this.groupsService.create(body);

    res.status(HttpStatus.CREATED).json({ group: { id: id, name: name } });
  }

  @Get()
  async getGroups(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Group>> {
    limit = limit > 50 ? 50 : limit;

    return this.groupsService.search({
      page,
      limit,
    });
  }

  @Get('/:id')
  async getGroup(@Res() res: Response, @Param('id') id: string) {
    const group = await this.groupsService.findOne(parseInt(id));
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    res.status(HttpStatus.OK).json(group);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: CreateGroupDto) {
    return this.groupsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeGroup(@Res() res: Response, @Param('id') id: string) {
    if (id) {
      await this.groupsService.remove(parseInt(id));
      return res.json(null);
    }
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Something went wrong',
    });
  }
}
