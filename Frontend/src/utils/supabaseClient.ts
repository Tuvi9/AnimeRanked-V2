import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_PROJECT_URL as string
const supabaseKey = import.meta.env.VITE_SERVICE_KEY as string

const supabase = createClient<Database>(supabaseUrl || "", supabaseKey || "")

export default supabase