import { Reflector } from '@nestjs/core'

/**
 * Decorate controller (class) or route handler (function) with it to 
 * disable authentication process.
 */
export const NoAuth = Reflector.createDecorator<boolean>()