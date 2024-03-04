import * as React from 'react'
import { User } from '../../types/types.ts'
import { UserContext } from './ctx/UserContext.ts'

export function UserProvider({ children }: React.PropsWithChildren) {
  const [ user, setUser ] = React.useState<User | undefined>(undefined)

  return <UserContext.Provider value={{ current: user, setUser }}>
    {children}
  </UserContext.Provider>
}