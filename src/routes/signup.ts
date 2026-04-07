import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabaseClient'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const signupRoute = new Hono<{ Bindings: Env }>()

type SignUp = {
  user_email: string
  user_pass: string
  user_phone: string
  display_name: string
}

signupRoute.post('/', async (c) => {
  const supabase = createSupabaseClient(c.env)

  const body: SignUp = await c.req.json()

  const { data, error } = await supabase.auth.signUp({
    email: body.user_email,
    password: body.user_pass,
    options: {
      emailRedirectTo: 'https://hono-api.licloudtaflare.workers.dev/signup_verification/auth/callback',
      data: {
          display_name: body.display_name,
          phone: body.user_phone
          }
      }
    })

  if (error) return c.json({ error: error.message }, 400)

  return c.json({ message: 'Sign up success!', user: data ?? null })
})