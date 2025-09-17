# Twilio Dialer Setup Guide

## Issue Resolution: Configuration Saving Problem

The configuration saving issue was caused by **missing database environment variables**. Follow this guide to set up the dialer properly.

## Required Environment Variables

Update your `.env.local` file with the following variables:

### 1. Supabase Database Configuration

```bash
# Get these from your Supabase project dashboard
DATABASE_URL=ppostgresql://postgres:Restartmylife2025@db.xctamnjglrsxhgzszkai.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xctamnjglrsxhgzszkai.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdGFtbmpnbHJzeGhnenN6a2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMDkxOTksImV4cCI6MjA2MjU4NTE5OX0.-nV61eUXRtnJdXPeV9a2XY5qJ8LsZW_J47IR1maPALM
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdGFtbmpnbHJzeGhnenN6a2FpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzAwOTE5OSwiZXhwIjoyMDYyNTg1MTk5fQ.to1oMjVFx8YCbG8TheIJIn_Ii3UYxKjyB3iZLLB3Pdo
```

### 2. How to Get Supabase Credentials

1. **Go to your Supabase project dashboard**
2. **Database URL**: 
   - Navigate to `Settings` → `Database`
   - Copy the connection string from "Connection string" → "URI"
3. **Supabase URL**: 
   - Found in `Settings` → `API` → "Project URL"
4. **Anon Key**: 
   - Found in `Settings` → `API` → "Project API keys" → "anon public"
5. **Service Role Key**: 
   - Found in `Settings` → `API` → "Project API keys" → "service_role"

### 3. Initialize Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
-- Execute the contents of prisma/supabase-full-setup.sql
-- This creates the twilio_config table and all necessary constraints
```

Or run this command to apply the schema:

```bash
npx prisma db push
```

## Testing the Fix

1. **Restart your development server** after updating environment variables:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Navigate to Admin → Dialer**

3. **Fill in the Twilio API Configuration**:
   - Account SID: Your Twilio Account SID
   - Auth Token: Your Twilio Auth Token  
   - Phone Number: Your Twilio phone number (format: +1234567890)

4. **Click "Save Configuration"**

5. **Verify the save was successful** - you should see a success message and no console errors

## Troubleshooting

### If you still see errors:

1. **Check browser console** for specific error messages
2. **Verify environment variables** are loaded:
   ```bash
   # In your terminal, check if variables are set
   echo $DATABASE_URL
   ```
3. **Check Supabase connection**:
   - Ensure your Supabase project is active
   - Verify the database password is correct
   - Check if your IP is whitelisted (if using IP restrictions)

### Common Error Messages:

- **"Environment variable not found: DATABASE_URL"** → Add DATABASE_URL to .env.local
- **"Failed to connect to database"** → Check Supabase credentials and network
- **"Table 'twilio_config' doesn't exist"** → Run the SQL schema setup

## Security Notes

- **Never commit** `.env.local` to version control
- **Use strong passwords** for your database
- **Rotate API keys** regularly
- **Use service role key** only for server-side operations

## File Structure

The dialer system consists of:
- `components/dialer/dialer.tsx` - Main dialer component
- `app/api/twilio/config/route.ts` - API endpoint for saving configs
- `prisma/schema.prisma` - Database schema
- `prisma/supabase-*.sql` - Database setup scripts

## Next Steps

After fixing the environment configuration:
1. Test the dialer functionality
2. Configure your Twilio webhook URLs
3. Set up proper authentication for production use