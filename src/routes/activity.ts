import { Hono } from 'hono'
import { createSupabaseClient } from '../lib/supabaseClient'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const activityRoute = new Hono<{ Bindings: Env }>()

type Activity = {
  list_type_id: number
  list_name: string
  i_by: number
}

activityRoute.get('/', async (c) => {
  const supabase = createSupabaseClient(c.env)

  // const { data, error } = await supabase.from('list_ms').select('list_id,list_name,list_type_ms(list_type_name)')

  const { data, error } = await supabase.rpc('fs_get_activities_full')

  if (error) return c.json({ error: error.message }, 500)
  return c.json({ activities: data })
})

activityRoute.post('/', async (c) => {
  const supabase = createSupabaseClient(c.env)

  const body: Activity = await c.req.json()

  const { data, error } = await supabase.from('list_ms').insert([body]).select()

  if (error) return c.json({ error: error.message }, 500)
  return c.json({ message: 'Activity added!', activity: data?.[0] ?? null })
})