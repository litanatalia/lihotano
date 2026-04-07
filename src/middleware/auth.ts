import { Context, Next } from 'hono'
import { createClient } from '@supabase/supabase-js'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const authMiddleware = async (c: Context<{ Bindings: Env }>, next: Next) => {
    const supabase = createClient(
        c.env.SUPABASE_URL,
        c.env.SUPABASE_KEY
    )
  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  const token = authHeader.replace('Bearer ', '')

  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data.user) {
    return c.json({ message: 'Invalid token' }, 401)
  }

  // inject user ke context
  c.set('user', data.user)

  await next()
}