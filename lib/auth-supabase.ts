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
  const supabase = getSupabaseServerClient()
  // Try by username first (app-core schema), then by email (supabase schema)
  const byUsername = await supabase
    .from('admin_users')
    .select('id, username, email, role, password_hash, created_at')
    .eq('username', username)
    .maybeSingle()
  if (byUsername.data) return byUsername.data as AdminUser & { password_hash: string }

  const byEmail = await supabase
    .from('admin_users')
    .select('id, username, email, role, password_hash, created_at')
    .eq('email', username)
    .maybeSingle()
  if (byEmail.data) return byEmail.data as AdminUser & { password_hash: string }

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
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ username, password_hash, role })
    .select('id, username, role, created_at')
    .single()
  if (error) throw error
  return data as AdminUser
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}


