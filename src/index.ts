import { Hono } from 'hono'
import { activityRoute } from './routes/activity'
import { signupRoute } from './routes/signup'
import { signupResendRoute } from './routes/signup_resend'
import { signupEmailVerificationRoute } from './routes/signup_email_verification'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.route('/activities', activityRoute)
app.route('/signup', signupRoute)
app.route('/signup_resend', signupResendRoute)
app.route('/signup_verification', signupEmailVerificationRoute)

export default app