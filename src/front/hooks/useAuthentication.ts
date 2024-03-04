import * as React from 'react'
import { UserSetFunc } from '../../types/types.ts'
import { UserContext } from '../components/ctx/UserContext.ts'

export function useAuthentication(): UserSetFunc {
  return React.useContext(UserContext).setUser
}
