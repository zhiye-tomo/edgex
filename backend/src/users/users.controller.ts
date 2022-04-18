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
      const registerdUser = await this.uesrsService.findOne(body.email);
      if (registerdUser) {
        const jwt = await this.uesrsService.generateJWT(registerdUser);
        res.status(HttpStatus.OK).json({
          code: 'OK',
          message: 'Successfully logged in',
          jwt,
        });
        return;
      }
      const user = await this.uesrsService.create(body);
      const jwt = this.uesrsService.generateJWT(user);
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
}
