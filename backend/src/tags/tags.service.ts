import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private repo: Repository<Tag>) {}
  async create(body: CreateTagDto) {
    const tag = this.repo.create(body);

    return this.repo.save(tag);
  }

  find(): Promise<Array<Tag>> {
    return this.repo.find();
  }

  findOneOrFail(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneOrFail({ id });
  }

  async remove(id: number) {
    const tag = await this.findOneOrFail(id);
    this.repo.remove(tag);
  }
}
