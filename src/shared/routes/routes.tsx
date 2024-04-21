import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import dashboardRoutes from '../../dashboard/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...dashboardRoutes]

export default routes
