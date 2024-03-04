export interface IdentifiedObject {
  id: number
}

/**
 * PartialUser is an unregistered user entity.
 */
export interface PartialUser {
  firstName: string
  lastName: string
  email: string
}

/**
 * User is an authenticated user, returned from the API after authentication.
 */
export type User = PartialUser & IdentifiedObject & {
  imageUrl: string
}

/**
 * Login form field content.
 */
export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export type UserSetFunc = (user: User) => void

/**
 * UserContext embed data.
 */
export type UserContextData = {
  /** Undefined if unauthenticated. */
  current: User | undefined

  /** Context user injector. */
  setUser: UserSetFunc
}
