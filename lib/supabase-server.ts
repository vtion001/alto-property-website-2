import { createClient } from '@supabase/supabase-js'

export type Database = any

export function getSupabaseServerClient() {
  // Prefer server-only envs; fall back to public URL and anon key in development to avoid crashes
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE
  const isProductionMode = process.env.NODE_ENV === 'production'

  const keyToUse = serviceRoleKey || (!isProductionMode ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined)

  if (!supabaseUrl || !keyToUse) {
    const reason = !supabaseUrl ? 'SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL' : 'SUPABASE_SERVICE_ROLE (or NEXT_PUBLIC_SUPABASE_ANON_KEY in dev)'
    throw new Error(`Supabase env vars are missing: ${reason}`)
  }

  return createClient<Database>(supabaseUrl, keyToUse, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}


