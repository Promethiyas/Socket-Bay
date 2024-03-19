import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { NoAuth } from './decorator/public-access.decorator'
import { AuthService } from './auth/auth.service'
import { UsersService } from './users/users.service'
import { ConfigService } from '@nestjs/config'
import { BidsService } from './bids/bids.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly auth: AuthService,
    @Inject(forwardRef(() => UsersService))
    private readonly users: UsersService,
    private readonly reflector: Reflector,
  ) {}

  // Return false => 403 Forbidden
  // Return true  => Continue...
  // Throw UnauthorizeException => 401 Unauthorized
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const publicAccess = this.reflector.getAllAndOverride<boolean>(NoAuth, [
      ctx.getClass(),
      ctx.getHandler()
    ])

    // Decorating a route handler or a controller class using @PublicAccess will
    // disable authentication process for decorated members
    if (publicAccess) return true
    const req: Request = ctx.switchToHttp().getRequest()

    if (!req.headers.authorization) throw new UnauthorizedException()
    const token = extractJwtFromHeader(req.headers.authorization)

    if (!token) throw new UnauthorizedException()
    const payload = await this.auth.verifyToken(token)

    if (!payload?.sub) throw new UnauthorizedException()
    const user = await this.users.findOneByID(payload.sub)
    
    if (!user) throw new UnauthorizedException()
    req['user'] = user

    return true
  }
}

/**
 * Helper for extracting JWT from request authorization header.
 */
function extractJwtFromHeader(authorizationHeader: string): string | null {
  const [type, token] = authorizationHeader.split(' ')

  return type?.toLowerCase() === 'bearer' ? token : null
}