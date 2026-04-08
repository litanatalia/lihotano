import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabaseClient'
import { AppContext } from '../types/hono'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const refreshTokenRoute = new Hono<AppContext>()

refreshTokenRoute.post('/', async (c) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader) {
    return c.json({ message: 'No refresh token' }, 401)
    }

    const refreshToken = authHeader.replace('Bearer ', '')
    const supabase = createSupabaseClient(c.env)

    if (!refreshToken) {
        return c.json({ message: 'No refresh token' }, 401)
    }

    const { data, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
    })

    if (error) {
        return c.json({ message: 'Invalid refresh token' }, 401)
    }

    return c.json({
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token
    })
})