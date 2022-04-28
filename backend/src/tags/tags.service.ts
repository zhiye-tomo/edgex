import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

type SearchOptions = {} & IPaginationOptions;

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}
  async create(body: CreateTagDto): Promise<Tag> {
    const tag = this.repo.create(body);
    const existingTag = await this.repo.findOne({ name: tag.name });

    if (existingTag) {
      throw new ConflictException(['Tag already exists']);
    }

    return await this.repo.save(tag);
  }

  async search(options: SearchOptions): Promise<Pagination<Tag>> {
    const queryBuilder = this.repo.createQueryBuilder('tag');
    queryBuilder.orderBy('tag.name', 'ASC');

    return paginate<Tag>(queryBuilder, options);
  }

  findOneById(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  async remove(id: number) {
    const tag = await this.repo.findOne(id);
    await this.repo.remove(tag);
  }
}
