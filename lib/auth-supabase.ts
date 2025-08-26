import bcrypt from 'bcryptjs'
import { getSupabaseServerClient } from './supabase-server'

export type AdminUser = {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  created_at: string
}

export async function findUserByEmail(email: string): Promise<(AdminUser & { password_hash: string }) | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .single()
  if (error || !data) return null
  return data as any
}

export async function findUserById(id: string): Promise<AdminUser | null> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, email, name, role, created_at')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return data as any
}

export async function createUser({ name, email, password, role }: { name: string; email: string; password: string; role: 'admin' | 'super_admin' }) {
  const password_hash = await bcrypt.hash(password, 12)
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ name, email, password_hash, role })
    .select('id, email, name, role, created_at')
    .single()
  if (error) throw error
  return data as AdminUser
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}


