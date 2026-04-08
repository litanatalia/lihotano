import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabaseClient'
import { AppContext } from '../types/hono'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const loginRoute = new Hono<AppContext>()

loginRoute.post('/', async (c) => {
  try {
    const { email, password } = await c.req.json()

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400)
    }

    const supabase = createSupabaseClient(c.env)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return c.json({ error: error.message }, 401)
    }

    return c.json({
      message: 'Login success',
      session: data.session,
      user: data.user
    })

  } catch (err) {
    return c.json({ error: 'Internal server error' }, 500)
  }
})