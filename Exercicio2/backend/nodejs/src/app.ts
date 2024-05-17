import fastify from 'fastify'

import { customerRoutes } from './http/routes/customers.routes'
import { planRoutes } from './http/routes/plans.routes'
import { vehicleRoutes } from './http/routes/vehicles.routes'
import { contractRoutes } from './http/routes/contracts.routes'
import { customerVehicleRoutes } from './http/routes/customer-vehicle.routes'
import { customerPlansRoutes } from './http/routes/customer-plan.routes'
import { parkMovementRoutes } from './http/routes/park-movement.routes'

export const app = fastify()

app.register(planRoutes, { prefix: 'api/v1' })
app.register(vehicleRoutes, { prefix: 'api/v1' })
app.register(customerRoutes, { prefix: 'api/v1' })
app.register(contractRoutes, { prefix: 'api/v1' })
app.register(parkMovementRoutes, { prefix: 'api/v1' })
app.register(customerPlansRoutes, { prefix: 'api/v1' })
app.register(customerVehicleRoutes, { prefix: 'api/v1' })
