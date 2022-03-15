import { Body, Controller, Get, Put, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterNewUserDto } from './dto/store-new-user.dto';
import { Response } from 'express';
import { SkipAuth } from 'src/decorators/skip_auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private uesrsService: UsersService) {}

  @SkipAuth()
  @Put()
  async registerOrLogin(
    @Res() res: Response,
    @Body() body: RegisterNewUserDto,
  ) {
    try {
      const users = await this.uesrsService.find(body.email);
      if (users.length) {
        const user = users[0];
        const jwt = await this.uesrsService.generateJWT(user);
        res.status(HttpStatus.OK).json({
          error: {
            code: 'email_already_exists',
            message: 'Email already exists',
          },
          jwt,
        });
        return;
      }

      const jwt = await this.uesrsService.returnJwtForNewUser(body);
      res.status(HttpStatus.CREATED).json({ success: true, jwt });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: {
          code: 'internal_server_error',
          message: 'Internal server error',
        },
      });
    }
  }

  @Get()
  getHelloWorld() {
    return 'Hello World!';
  }
}
