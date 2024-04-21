import { AbilityBuilder, createMongoAbility } from '@casl/ability'

export const defineAbilitiesFor = (permissions: string[] | 'admin') => {
  const { can, build } = new AbilityBuilder(createMongoAbility)
  if (permissions === 'admin') {
    can('manage', 'all')
  } else {
    permissions.forEach((permission: string) => {
      const [action, resource] = permission.split('_')
      if (action && resource) {
        can(action.toLowerCase(), resource.toLowerCase())
      }
    })
  }
  return build()
}
