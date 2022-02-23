import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterNewUserDto } from './dto/store-new-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(body: RegisterNewUserDto) {
    const user = this.repo.create({ ...body });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ id });
  }

  find(email: string) {
    return this.repo.find({ email });
  }
}
