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
  type AdminUserWithHash = AdminUser & { password_hash?: string }
  const byUsernameData = byUsername.data as AdminUserWithHash | null
  
  console.log('👤 Username search result:', { 
    data: byUsernameData ? { 
      id: byUsernameData.id, 
      username: byUsernameData.username, 
      email: byUsernameData.email, 
      role: byUsernameData.role,
      hasPasswordHash: !!byUsernameData.password_hash
    } : null, 
    error: byUsername.error 
  })
  
  if (byUsernameData) return byUsernameData as AdminUser & { password_hash: string }

  console.log('🔍 Searching by email...')
  const byEmail = await supabase
    .from('admin_users')
    .select('id, username, email, role, password_hash, created_at')
    .eq('email', username)
    .maybeSingle()
  const byEmailData = byEmail.data as AdminUserWithHash | null
    
  console.log('📧 Email search result:', { 
    data: byEmailData ? { 
      id: byEmailData.id, 
      username: byEmailData.username, 
      email: byEmailData.email, 
      role: byEmailData.role,
      hasPasswordHash: !!byEmailData.password_hash
    } : null, 
    error: byEmail.error 
  })
  
  if (byEmailData) return byEmailData as AdminUser & { password_hash: string }

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


