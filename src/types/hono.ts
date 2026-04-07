import { User } from '@supabase/supabase-js'

export type AppBindings = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export type AppVariables = {
  user: User
}

export type AppContext = {
  Bindings: AppBindings
  Variables: AppVariables
}