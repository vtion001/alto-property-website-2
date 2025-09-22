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

  // Log which key type is being used for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('🔑 Supabase client using:', serviceRoleKey ? 'SERVICE_ROLE' : 'ANON_KEY')
  }

  return createClient<Database>(supabaseUrl, keyToUse, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'x-client-info': 'alto-property-server'
      }
    }
  })
}

// Helper function to handle common Supabase errors
export function handleSupabaseError(error: any, operation: string) {
  console.error(`❌ Supabase ${operation} error:`, error)
  
  if (error?.message?.includes('permission denied')) {
    return {
      error: 'Database permission error. Please check RLS policies.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: 'PERMISSION_DENIED'
    }
  }
  
  if (error?.message?.includes('relation') && error?.message?.includes('does not exist')) {
    return {
      error: 'Database table not found. Please check schema setup.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: 'TABLE_NOT_FOUND'
    }
  }
  
  return {
    error: 'Database operation failed',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    code: 'DATABASE_ERROR'
  }
}


