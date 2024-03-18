import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload, UserWithToken } from 'src/types';
import { UserDocument } from 'src/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/decorator/curent-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => ConfigService))
    private readonly config: ConfigService
  ) {}

  async signIn(email: string, pass: string): Promise<string> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException('Invalid email or password')
    if (!(await bcrypt.compare(pass, user.password))) throw new UnauthorizedException();
  
    return this.createToken(user) ;
  }

  public async createToken(user: UserDocument): Promise<string> {
    return this.jwtService.sign({ sub: user._id })
  }

  public async verifyToken(token: string): Promise<TokenPayload | null> {
    return this.jwtService.verifyAsync<TokenPayload>(token)
  }
}
