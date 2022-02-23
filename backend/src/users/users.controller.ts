import { Body, Controller, Put, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterNewUserDto } from './dto/store-new-user.dto';

@Controller('users')
export class UsersController {
  constructor(private uesrsService: UsersService) {}
  @Put()
  async registerNewUser(@Body() body: RegisterNewUserDto) {
    try {
      const users = await this.uesrsService.find(body.email);
      if (users.length) {
        return { success: true };
      }

      const user = await this.uesrsService.create(body);

      return user;
    } catch (error) {
      console.log(error);

      return HttpException;
    }
  }
}
