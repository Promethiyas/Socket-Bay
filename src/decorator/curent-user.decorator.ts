import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserDocument } from '../schemas/users.schema'
import { RequestWithUser } from '../types'

/**
 * Decorate a route handler parameter using this decorator to inject current
 * authenticated user.
 *
 * This decorator require the current authenticated user to be injected
 * into request (job done automatically by AuthGuard).
 */
export const User = createParamDecorator<keyof UserDocument>(
  (field: keyof UserDocument | undefined = null, ctx: ExecutionContext) => {
    const req: RequestWithUser = ctx.switchToHttp().getRequest()
    return req.user ? (field ? req.user[field] : req.user) : null
  }
)