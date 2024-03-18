import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
//import { TypeOrmModule } from '@nestjs/typeorm';
/*import { User } from '../schemas/users.schema';*/
//import { AuthService } from '../auth/auth.service';
//import { AuthModule } from '../auth/auth.module';
//import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, User, UserSchema } from 'src/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
//import { JwtAuthGuard } from '../jwt-auth-guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
