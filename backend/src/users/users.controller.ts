import { Body, Controller, Put, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterNewUserDto } from './dto/store-new-user.dto';
import { CannotAttachTreeChildrenEntityError } from 'typeorm';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';

@Controller('users')
export class UsersController {
  constructor(private uesrsService: UsersService) {}
  @Put()
  async registerNewUser(@Body() body: RegisterNewUserDto) {
    try {
      const users = await this.uesrsService.find(body.email);
      if (users.length) {
        return {
          error: {
            code: 'email_already_exists',
            message: 'Email already exists',
          },
        };
      }

      return await this.uesrsService.create(body);
    } catch (error) {
      console.log(error);

      return HttpException;
    }
  }
}
