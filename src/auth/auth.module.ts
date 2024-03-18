import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secretOrKeyProvider: () => cfg.getOrThrow('JWT_SECRET')
      })
    }),
  ],
  providers: [AuthService],
  controllers: [],
  exports: [AuthService]
})
export class AuthModule {}

