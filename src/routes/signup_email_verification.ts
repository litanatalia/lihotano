import { Hono } from 'hono'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const signupEmailVerificationRoute = new Hono<{ Bindings: Env }>()

signupEmailVerificationRoute.get('/auth/callback', (c) => {
  return c.html(`
    <html>
      <body>
        <h1>Email berhasil diverifikasi 🎉</h1>
      </body>
    </html>
  `)
})