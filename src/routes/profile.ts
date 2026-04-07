import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { AppVariables } from '../types/hono'

export const profileRoute = new Hono<{ Variables: AppVariables }>()

profileRoute.get('/', authMiddleware, (c) => {
  const user = c.get('user')

  return c.json({
    message: 'Success',
    user
  })
})