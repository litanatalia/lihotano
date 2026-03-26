import { createClient } from '@supabase/supabase-js'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const createSupabaseClient = (env: Env) => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
}