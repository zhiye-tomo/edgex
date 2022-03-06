import { Body, Controller, Put, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterNewUserDto } from './dto/store-new-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private uesrsService: UsersService) {}

  @Put()
  async registerOrLogin(
    @Res() res: Response,
    @Body() body: RegisterNewUserDto,
  ) {
    try {
      const users = await this.uesrsService.find(body.email);
      if (users.length) {
        const jwt = await this.uesrsService.returnJWT(body);
        res.status(HttpStatus.OK).json({
          error: {
            code: 'email_already_exists',
            message: 'Email already exists',
          },
          jwt,
        });
        return;
      }
      const jwt = await this.uesrsService.returnJWT(body);
      res.status(HttpStatus.CREATED).json({ success: true, jwt });
    } catch (error) {
      console.log(error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
          code: 'internal_server_error',
          message: 'Internal server error',
        },
      });
    }
  }
}
