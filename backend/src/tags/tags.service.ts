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

    return await this.repo.save(tag);
  }

  find(): Promise<Array<Tag>> {
    return this.repo.find();
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
      console.log('this id does not exist');
      return;
    }
    this.repo.remove(tag);
  }
}
