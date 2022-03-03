import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'qwertyuikjhgfd',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
