import { Hono } from 'hono'
import { activityRoute } from './routes/activity'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.route('/activities', activityRoute)

export default app