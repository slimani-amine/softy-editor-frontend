import React, { useEffect } from 'react'
import { Ability, AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability'
import { defineAbilitiesFor } from '../utils/defineAbilitiesFor'

type AbilityContextType = {
  ability: Ability
}
//get currentUser from getMe api
// const currentUser = {

// }
const allPermissions = ['CREATE', 'EDIT', 'VIEW', 'LIST']
export const AbilityContext = React.createContext<AbilityContextType>({
  ability: defineAbilitiesFor(allPermissions),
})
type Props = {
  children: React.ReactNode
}
export const AbilityContextProvider = ({ children }: Props) => {
  // const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (status === 'idle') {
      //get me
      //dispatch<any>(currentUser());
    }
  }, [])
  if (!user) {
    return <div>{children}</div>
  } else {
    let ability: MongoAbility<AbilityTuple, MongoQuery> = defineAbilitiesFor([])
    const isSuperAdmin = user.roles.some((role: { name: string }) => role.name === 'super-admin')
    if (isSuperAdmin) {
      //for testing
      ability = defineAbilitiesFor('admin')
    } else {
      const permissions: string[] = Array.from(
        new Set(user.roles.flatMap((role: { permissions: string[] }) => role.permissions))
      )
      ability = defineAbilitiesFor(permissions)
    }
    return <AbilityContext.Provider value={{ ability }}>{children}</AbilityContext.Provider>
  }
}
