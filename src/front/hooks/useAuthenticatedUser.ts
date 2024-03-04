import * as React from 'react'
import { User } from '../../types/types.ts'
import { UserContext } from '../components/ctx/UserContext.ts'

/**
 * Return the current authenticated user, otherwise throw an error.
 */
export function useAuthenticatedUser(): User {
  const user = React.useContext(UserContext).current
  if (!user) throw new Error('useAuthenticatedUser: There no authenticated user.')

  return user
}