// Simple database connection test
// Run with: node test-connection.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:Restartmylife2025@db.xctamnjglrsxhgzszkai.supabase.co:5432/postgres'
    }
  }
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test if tables exist
    const tableCount = await prisma.$queryRaw`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('twilio_config', 'call_logs', 'contacts')
    `;
    
    console.log('📊 Found tables:', tableCount);
    
    // Check twilio_config table
    const configExists = await prisma.twilioConfig.findFirst();
    console.log('⚙️  Current Twilio Config:', configExists || 'No configuration found');
    
    // List all tables
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Available tables:', tables);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Suggestion: Check your Supabase project status and ensure the database is accessible');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();