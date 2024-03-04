import * as React from 'react'
import { UserContextData } from '../../../types/types.ts'

export const UserContext = React.createContext<UserContextData>({
  current: undefined,
  setUser: () => {
  }
})
