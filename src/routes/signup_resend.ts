import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabaseClient'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const signupResendRoute = new Hono<{ Bindings: Env }>()

type SignUp = {
  user_email: string
  user_pass: string
  user_phone: string
  display_name: string
}

// signupResendRoute.post('/', async (c) => {
//   const supabase = createSupabaseClient(c.env)

//   const body: SignUp = await c.req.json()

//   const { data, error } = await supabase.auth.resend({
//     email: body.user_email,
//     type: 'signup',
//     options: {
//       emailRedirectTo: 'https://hisssandtell.com/'
//       }
//     })

//   if (error) return c.json({ error: error.message }, 400)

//   return c.json({ message: 'Resend Verification Sign up success!', user: data ?? null })
// })

signupResendRoute.post('', async (c) => {
  const supabase = createSupabaseClient(c.env)

  const body: SignUp = await c.req.json()

  const { data, error } = await supabase.auth.resend({
    email: body.user_email,
    type: 'signup',
    options: {
      emailRedirectTo: 'https://hono-api.licloudtaflare.workers.dev/signup_verification/auth/callback'
      }
    })

  if (error) return c.json({ error: error.message }, 400)

  return c.json({ message: 'Resend Verification Sign up success!', user: data ?? null })
})