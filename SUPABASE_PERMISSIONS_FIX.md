# Supabase Permissions Fix Guide

This guide addresses the "permission denied for schema public" errors in the Alto Property application.

## Problem

The application is experiencing permission errors when trying to access Supabase tables, particularly:
- `google_reviews` table
- `google_integration_tokens` table
- Other tables missing proper RLS policies

## Root Cause

1. **Missing RLS Policies**: Some tables don't have Row Level Security (RLS) policies configured
2. **Service Role Permissions**: The service role may not have proper permissions on all tables
3. **Schema Access**: Default privileges may not be set correctly

## Solution

### Step 1: Run the Permission Fix Script

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Navigate to your project
3. Go to **SQL Editor**
4. Copy and paste the contents of `prisma/fix-supabase-permissions.sql`
5. Click **Run** to execute the script

### Step 2: Verify Environment Variables

Ensure these environment variables are set correctly:

```bash
# Required for server-side operations
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE=your_service_role_key

# Required for client-side operations
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 3: Create Missing Tables

If you haven't already, run these SQL scripts in order:

1. `prisma/supabase-schema.sql` - Main schema
2. `prisma/google-reviews-schema.sql` - Google reviews table
3. `SUPABASE_SETUP.sql` - Twilio tables (if using dialer)

### Step 4: Test the Fix

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test API endpoints:
   ```bash
   # Test Google Reviews API
   curl http://localhost:3000/api/google-reviews
   
   # Test Properties API
   curl http://localhost:3000/api/properties
   ```

3. Check the console for the Supabase client type:
   - Should show "🔑 Supabase client using: SERVICE_ROLE" in development

## What the Fix Does

### 1. Schema Permissions
- Grants full access to the `public` schema for the service role
- Sets default privileges for future tables, sequences, and functions

### 2. RLS Policies
- Enables Row Level Security on all tables
- Creates service role policies that bypass RLS restrictions
- Maintains public read access where appropriate

### 3. Table-Specific Permissions
- Grants explicit permissions on all existing tables
- Handles missing tables gracefully with conditional logic

### 4. Enhanced Error Handling
- Adds better error messages for permission issues
- Provides debugging information in development mode
- Categorizes errors for easier troubleshooting

## Verification Queries

The fix script includes verification queries that show:
- Which tables have RLS enabled
- All active policies
- Service role permissions

## Common Issues and Solutions

### Issue: "relation does not exist"
**Solution**: Run the table creation scripts first, then the permissions fix.

### Issue: Still getting permission errors
**Solution**: 
1. Verify you're using the correct service role key
2. Check that the service role key has the `service_role` role in Supabase
3. Ensure you're not using the anon key for server-side operations

### Issue: RLS blocking legitimate requests
**Solution**: The service role policies should bypass RLS. If issues persist, check that the API routes are using `getSupabaseServerClient()` and not the client-side version.

## Testing Checklist

- [ ] Google Reviews API works (`/api/google-reviews`)
- [ ] Properties API works (`/api/properties`)
- [ ] Blog Posts API works (`/api/blog-posts`)
- [ ] No permission errors in server logs
- [ ] Service role is being used (check console logs)

## Monitoring

After applying the fix, monitor your application logs for:
- Permission denied errors
- Table not found errors
- RLS policy violations

The enhanced error handling will provide better debugging information to help identify any remaining issues.