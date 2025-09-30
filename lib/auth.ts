
import bcrypt from 'bcrypt'

export interface AdminUser {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'super_admin'
  createdAt: string
}

// In-memory storage for demo - in production, use a database
const adminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@altoproperty.com',
    password: '$2b$12$LQv3c1yqBwEHxE9ug8N0V.XvjcS5YQcJdGqzGZXpDxGXsLYjQ7Uym', // password123
    name: 'Admin User',
    role: 'super_admin',
    createdAt: new Date().toISOString()
  }
]

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function createUser(userData: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser {
  const user: AdminUser = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString()
  }
  adminUsers.push(user)
  return user
}

export function findUserByEmail(email: string): AdminUser | undefined {
  return adminUsers.find(user => user.email === email)
}

export function findUserById(id: string): AdminUser | undefined {
  return adminUsers.find(user => user.id === id)
}

export function getAllUsers(): AdminUser[] {
  return adminUsers
}
