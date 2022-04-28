import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Query,
  Put,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Response } from 'express';
import { GroupsService } from './groups.service';
import { DeleteGroupDto, GetGroupssDto } from './dto/query.dto';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}
  @Post()
  async createGroup(@Res() res: Response, @Body() body: CreateGroupDto) {
    const { id, name } = await this.groupsService.create(body);
    return res.status(HttpStatus.CREATED).json({ id, name });
  }

  @Get('/:id')
  async findGroup(@Param('id') id: string) {
    const user = await this.groupsService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async getGroups(@Res() res: Response, @Query() dto: GetGroupssDto) {
    let { page = 1, limit = 1 } = dto;

    limit = limit > 50 ? 50 : limit;

    const groups = await this.groupsService.search({
      page,
      limit,
    });

    return res.status(HttpStatus.OK).json(groups);
  }

  @Put('/:id')
  updateGroup(@Param('id') id: string, @Body() body: CreateGroupDto) {
    return this.groupsService.update(parseInt(id), body);
  }

  @Delete('/:id')
  async removeGroup(@Res() res: Response, @Param() dto: DeleteGroupDto) {
    const group = await this.groupsService.findOneById(parseInt(dto.id));

    if (!group) {
      throw new NotFoundException('Group does not exist');
    }
    await this.groupsService.remove(parseInt(dto.id));

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
