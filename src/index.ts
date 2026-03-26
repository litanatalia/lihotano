import { Hono } from 'hono'
import { activityRoute } from './routes/activity'
import { signupRoute } from './routes/signup'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.route('/activities', activityRoute)
app.route('/signup', signupRoute)

export default app