/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    path: '*',
    component: lazy(() => import('../features/NotFound/NotFound')),
  },
]

export default routes
