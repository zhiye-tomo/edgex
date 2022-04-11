import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

type SearchOptions = {
  word?: string;
} & IPaginationOptions;

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private repo: Repository<Group>) {}
  async create(body: CreateGroupDto): Promise<Group> {
    const group = this.repo.create(body);

    return await this.repo.save(group);
  }
  async search(options: SearchOptions): Promise<Pagination<Group>> {
    const queryBuilder = this.repo.createQueryBuilder('group');
    queryBuilder.orderBy('group.name', 'ASC');

    return paginate<Group>(queryBuilder, options);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ id });
  }

  async update(id: number, name: Partial<Group>) {
    const group = await this.findOne(id);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    Object.assign(group, name);
    return this.repo.save(group);
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    this.repo.remove(group);
  }
}
