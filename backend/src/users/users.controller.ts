import { Body, Controller, Put, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { StoreNewUserDto } from './dto/store-new-user.dto';

@Controller('users')
export class UsersController {
  constructor(private uesrsService: UsersService) {}
  @Put()
  async storeNewUser(@Body() body: StoreNewUserDto) {
    try {
      const users = await this.uesrsService.find(body.email);
      if (users.length) {
        return { success: true };
      }

      const user = await this.uesrsService.create(
        body.email,
        body.firstName,
        body.lastName,
      );

      return user;
    } catch (error) {
      console.log(error);

      return HttpException;
    }
  }
}
