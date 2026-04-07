import { Hono } from 'hono'
import { AppContext } from './types/hono'
import { activityRoute } from './routes/activity'
import { signupRoute } from './routes/signup'
import { signupResendRoute } from './routes/signup_resend'
import { signupEmailVerificationRoute } from './routes/signup_email_verification'
import { profileRoute } from './routes/profile'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<AppContext>()

app.route('/activities', activityRoute)
app.route('/signup', signupRoute)
app.route('/signup_resend', signupResendRoute)
app.route('/signup_verification', signupEmailVerificationRoute)
app.route('/profile', profileRoute)

export default app