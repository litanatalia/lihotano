import { Context, Next } from 'hono'
import { AppContext } from '../types/hono'
import { createSupabaseClient } from '../lib/supabaseClient'

export const authMiddleware = async (
  c: Context<AppContext>,
  next: Next
) => {
  const supabase = createSupabaseClient(c.env)

  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const token = authHeader.replace('Bearer ', '')

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return c.json({ message: 'Invalid token' }, 401)
  }

  // ✅ sekarang TypeScript ngerti
  c.set('user', data.user)

  await next()
}