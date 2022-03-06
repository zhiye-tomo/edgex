import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterNewUserDto } from './dto/store-new-user.dto';
import { User } from './user.entity';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(body: RegisterNewUserDto) {
    const user = this.repo.create(body);

    return await this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne({ id });
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async returnJWT(body: RegisterNewUserDto) {
    const user = await this.create(body);
    const jwt = this.generateJWT(user);
    return jwt;
  }

  generateJWT(user: User) {
    const token = this.jwtService.sign({ ...user });
    return token;
  }
}
