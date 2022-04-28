import {
  ConflictException,
  Delete,
  Injectable,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

type SearchOptions = {} & IPaginationOptions;

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private repo: Repository<Group>) {}
  async create(body: CreateGroupDto): Promise<Group> {
    const group = this.repo.create(body);
    const existingGroup = await this.repo.findOne({ name: group.name });

    if (existingGroup) {
      throw new ConflictException(['Group already exists']);
    }

    return await this.repo.save(group);
  }

  async search(options: SearchOptions): Promise<Pagination<Group>> {
    const queryBuilder = this.repo.createQueryBuilder('group');
    queryBuilder.orderBy('group.name', 'ASC');

    return paginate<Group>(queryBuilder, options);
  }

  findOneById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  async update(id: number, attrs: Partial<Group>) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const group = await this.repo.findOne(id);
    await this.repo.remove(group);
  }
}
