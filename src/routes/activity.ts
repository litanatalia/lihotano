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
  group_id: number
  i_by: number
}

activityRoute.get('/', async (c) => {
  const supabase = createSupabaseClient(c.env)

  const groupId = c.req.query('group_id')

  if (!groupId) {return c.json({error: 'group_id is required'},400)}

  // const { data, error } = await supabase
  // .from('list_ms')
  // .select('list_id,list_name,group_id)')
  // .eq('group_id', groupId)
  // .single()

  const { data, error } = await supabase.rpc('fs_get_activities_full',{
    group_id: groupId
  })

  if (error) return c.json({ error: error.message }, 500)
  return c.json({ activities: data })
})

activityRoute.post('/', async (c) => {
  const supabase = createSupabaseClient(c.env)

  const body: Activity = await c.req.json()

  if (!body.list_type_id) {return c.json({error: 'list_type_id is required'},400)}
  if (!body.list_name) {return c.json({error: 'list_name is required'},400)}
  if (!body.group_id) {return c.json({error: 'group_id is required'},400)}
  if (!body.i_by) {return c.json({error: 'i_by is required'},400)}

  const { data, error } = await supabase.from('list_ms').insert([body]).select()

  if (error) return c.json({ error: error.message }, 500)
  return c.json({ message: 'Activity added!', activity: data?.[0] ?? null })
})