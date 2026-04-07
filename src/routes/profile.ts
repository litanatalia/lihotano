import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth'
import { AppContext } from '../types/hono'

export const profileRoute = new Hono<AppContext>()

profileRoute.get('/', authMiddleware, (c) => {
  const user = c.get('user') // ✅ aman

  return c.json({
    message: 'Success',
    user
  })
})