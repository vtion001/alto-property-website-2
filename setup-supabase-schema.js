#!/usr/bin/env node

/**
 * Supabase Schema Setup Script
 * 
 * This script helps you run the complete Supabase schema to fix permission errors
 * for the blog-posts and properties endpoints.
 * 
 * INSTRUCTIONS:
 * 1. Go to your Supabase project dashboard
 * 2. Navigate to SQL Editor
 * 3. Copy and paste the contents of prisma/supabase-full-setup.sql
 * 4. Execute the SQL to create missing tables and permissions
 * 
 * Alternatively, if you have Supabase CLI installed:
 * npx supabase db reset --db-url "your-supabase-connection-string"
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Supabase Schema Setup Helper');
console.log('================================');

const schemaPath = path.join(__dirname, 'prisma', 'supabase-full-setup.sql');

if (!fs.existsSync(schemaPath)) {
  console.error('❌ Schema file not found:', schemaPath);
  process.exit(1);
}

const schemaContent = fs.readFileSync(schemaPath, 'utf8');

console.log('✅ Found schema file:', schemaPath);
console.log('📋 Schema content preview:');
console.log('─'.repeat(50));
console.log(schemaContent.substring(0, 500) + '...');
console.log('─'.repeat(50));

console.log('\n🚀 NEXT STEPS:');
console.log('1. Go to your Supabase project dashboard');
console.log('2. Navigate to SQL Editor');
console.log('3. Copy the entire contents of prisma/supabase-full-setup.sql');
console.log('4. Paste and execute the SQL');
console.log('5. This will create the missing blog_posts and properties tables');
console.log('6. Run your development server to test the endpoints');

console.log('\n📝 The schema will create:');
console.log('   • admin_users table');
console.log('   • properties table');
console.log('   • rental_applications table');
console.log('   • blog_posts table');
console.log('   • contacts table');
console.log('   • call_logs table');
console.log('   • twilio_config table');
console.log('   • Proper RLS policies and permissions');

console.log('\n🔗 Your Supabase project URL from .env.local:');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const supabaseUrl = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
  if (supabaseUrl) {
    console.log('   ' + supabaseUrl[1].trim());
  }
}