// Use bcryptjs for edge/webpack compatibility
import bcrypt from 'bcryptjs'
import { getSupabaseServerClient } from './supabase-server'

export type AdminUser = {
  id: string
  username?: string
  email?: string
  role?: 'admin' | 'super_admin'
  created_at?: string
}

export async function findUserByUsername(username: string): Promise<(AdminUser & { password_hash: string }) | null> {
  console.log('🔍 findUserByUsername called with:', username)
  const supabase = getSupabaseServerClient()
  
  // Try by username first (app-core schema), then by email (supabase schema)
  console.log('🔍 Searching by username...')
  const byUsername = await supabase
    .from('admin_users')
    .select('id, username, email, role, password_hash, created_at')
    .eq('username', username)
    .maybeSingle()
  
  console.log('👤 Username search result:', { 
    data: byUsername.data ? { 
      id: byUsername.data.id, 
      username: byUsername.data.username, 
      email: byUsername.data.email, 
      role: byUsername.data.role,
      hasPasswordHash: !!byUsername.data.password_hash
    } : null, 
    error: byUsername.error 
  })
  
  if (byUsername.data) return byUsername.data as AdminUser & { password_hash: string }

  console.log('🔍 Searching by email...')
  const byEmail = await supabase
    .from('admin_users')
    .select('id, username, email, role, password_hash, created_at')
    .eq('email', username)
    .maybeSingle()
    
  console.log('📧 Email search result:', { 
    data: byEmail.data ? { 
      id: byEmail.data.id, 
      username: byEmail.data.username, 
      email: byEmail.data.email, 
      role: byEmail.data.role,
      hasPasswordHash: !!byEmail.data.password_hash
    } : null, 
    error: byEmail.error 
  })
  
  if (byEmail.data) return byEmail.data as AdminUser & { password_hash: string }

  console.log('❌ No user found by username or email')
  return null
}

export async function findUserById(id: string): Promise<AdminUser | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, username, role, created_at')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return data as AdminUser
}

export async function createUser({ username, password, role }: { username: string; password: string; role: 'admin' | 'super_admin' }) {
  const password_hash = await bcrypt.hash(password, 12)
  const supabase = getSupabaseServerClient()
  const { data, error } = await (supabase
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .from('admin_users') as any)
    .insert({ username, password_hash, role })
    .select('id, username, role, created_at')
    .single()
  if (error) throw error
  return data as AdminUser
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}


