import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

type SearchOptions = {
  word?: string;
} & IPaginationOptions;

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}
  async create(body: CreateTagDto): Promise<Tag> {
    const tag = this.repo.create(body);

    return await this.repo.save(tag);
  }

  async search(options: SearchOptions): Promise<Pagination<Tag>> {
    const queryBuilder = this.repo.createQueryBuilder('tag');
    queryBuilder.orderBy('tag.name', 'ASC');

    return paginate<Tag>(queryBuilder, options);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ id });
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new NotFoundException('tag not found');
    }
    this.repo.remove(tag);
  }
}
