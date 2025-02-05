import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.SERVICE_KEY;

// (!) tells TypeScript that the variable assigned is indeed valid for all intents and purposes, even if Typescript's analyses cannot detect so.
const supabase = createClient(supabaseUrl!, supabaseKey!)

export default supabase;