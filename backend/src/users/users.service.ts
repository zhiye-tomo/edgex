import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, firstName: string, lastName: string) {
    const user = this.repo.create({ email, firstName, lastName });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ id });
  }

  find(email: string) {
    return this.repo.find({ email });
  }
}
