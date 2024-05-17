import fastify from 'fastify'
import { customerRoutes } from './http/routes/customers.routes'

export const app = fastify()

app.register(customerRoutes, { prefix: 'api/v1' })
