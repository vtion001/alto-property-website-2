// Simple database connection test
// Run with: node test-connection.js

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Lightweight .env loader that supports special characters like & and = in values
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  try {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const eqIndex = line.indexOf('=');
      if (eqIndex === -1) continue;
      const key = line.slice(0, eqIndex).trim();
      const value = line.slice(eqIndex + 1).trim();
      // Do not strip quotes; keep value as-is so connection strings remain intact
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (e) {
    console.warn('Could not load .env:', e.message);
  }
}

loadEnv();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    }
  },
  log: [{ level: 'error', emit: 'stdout' }, { level: 'warn', emit: 'stdout' }]
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    console.log('Using DATABASE_URL:', (process.env.DATABASE_URL || 'undefined').replace(/:[^:@]*@/, ':****@'));

    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test if tables exist
    const tableCount = await prisma.$queryRaw`\
      SELECT COUNT(*) as count \
      FROM information_schema.tables \
      WHERE table_schema = 'public' \
      AND table_name IN ('twilio_config', 'call_logs', 'contacts')
    `;
    
    console.log('📊 Found tables:', tableCount);
    
    // Check twilio_config table
    const configExists = await prisma.twilioConfig.findFirst();
    console.log('⚙️  Current Twilio Config:', configExists || 'No configuration found');
    
    // List all tables
    const tables = await prisma.$queryRaw`\
      SELECT table_name \
      FROM information_schema.tables \
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Available tables:', tables);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    if (error && error.meta && error.meta.dbError) {
      console.error('DB Error:', error.meta.dbError);
    }
    console.error('💡 Suggestion: Check your Supabase project status and ensure the database is accessible');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();