const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually load environment variables from .env file
function loadEnvFile() {
    const envPath = path.join(__dirname, '.env');
    const env = {};
    
    try {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                if (key && valueParts.length > 0) {
                    env[key.trim()] = valueParts.join('=').trim();
                }
            }
        }
    } catch (err) {
        console.log(`Error reading .env file: ${err.message}`);
    }
    
    return env;
}

async function diagnoseConnection() {
    console.log('🔍 Supabase Connection Diagnosis');
    console.log('================================\n');

    // Load environment variables
    const env = loadEnvFile();

    // Test 1: Environment Variables
    console.log('1. Environment Variables:');
    console.log(`   DATABASE_URL: ${env.DATABASE_URL ? 'Set' : 'Not set'}`);
    console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}`);
    console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY: ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}`);
    console.log(`   SUPABASE_SERVICE_ROLE: ${env.SUPABASE_SERVICE_ROLE ? 'Set' : 'Not set'}\n`);

    // Test 2: Database URL Analysis
    console.log('2. Database URL Analysis:');
    if (env.DATABASE_URL) {
        console.log(`   DATABASE_URL: ${env.DATABASE_URL.replace(/:[^:@]*@/, ':****@')}`);
        
        // Parse the URL to check components
        try {
            const url = new URL(env.DATABASE_URL);
            console.log(`   Protocol: ${url.protocol}`);
            console.log(`   Host: ${url.hostname}`);
            console.log(`   Port: ${url.port}`);
            console.log(`   Database: ${url.pathname.slice(1)}`);
            console.log(`   Username: ${url.username}`);
        } catch (err) {
            console.log(`   ❌ Invalid DATABASE_URL format: ${err.message}`);
        }
    } else {
        console.log('   ⚠️  DATABASE_URL not found in environment');
    }
    console.log('');

    // Test 3: Supabase Client Connection with Anon Key
    console.log('3. Testing Supabase Client Connection (Anon Key):');
    try {
        const supabase = createClient(
            env.NEXT_PUBLIC_SUPABASE_URL,
            env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Try to access a simple endpoint
        const { data, error } = await supabase.from('test').select('*').limit(1);
        
        if (error) {
            console.log(`   ❌ Supabase Client Error: ${error.message}`);
            console.log(`   Error Code: ${error.code}`);
            console.log(`   Error Details: ${error.details}`);
            
            // Check if it's a table not found error (which means connection is working)
            if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
                console.log('   ✅ Connection is working (table "test" does not exist, which is expected)');
            }
        } else {
            console.log('   ✅ Supabase Client Connection: Success');
        }
    } catch (err) {
        console.log(`   ❌ Supabase Client Exception: ${err.message}`);
    }
    console.log('');

    // Test 4: Supabase Client Connection with Service Role
    console.log('4. Testing Supabase Client Connection (Service Role):');
    if (env.SUPABASE_SERVICE_ROLE) {
        try {
            const supabaseService = createClient(
                env.NEXT_PUBLIC_SUPABASE_URL,
                env.SUPABASE_SERVICE_ROLE
            );

            const { data, error } = await supabaseService.from('test').select('*').limit(1);
            
            if (error) {
                console.log(`   ❌ Service Role Connection Error: ${error.message}`);
                console.log(`   Error Code: ${error.code}`);
                
                // Check if it's a table not found error (which means connection is working)
                if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
                    console.log('   ✅ Connection is working (table "test" does not exist, which is expected)');
                }
            } else {
                console.log('   ✅ Service Role Connection: Success');
            }
        } catch (err) {
            console.log(`   ❌ Service Role Exception: ${err.message}`);
        }
    } else {
        console.log('   ⚠️  SUPABASE_SERVICE_ROLE not found');
    }
    console.log('');

    // Test 5: Project Status Check
    console.log('5. Project Status Check:');
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
            headers: {
                'apikey': env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            }
        });

        if (response.ok) {
            console.log('   ✅ Supabase API: Accessible');
            console.log(`   Status: ${response.status} ${response.statusText}`);
        } else {
            console.log(`   ❌ Supabase API Error: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.log(`   Response: ${errorText.substring(0, 200)}...`);
        }
    } catch (err) {
        console.log(`   ❌ Supabase API Exception: ${err.message}`);
    }

    console.log('\n🔧 Recommendations:');
    console.log('1. Check if your Supabase project is paused in the dashboard');
    console.log('2. Verify your project URL and API keys are correct');
    console.log('3. Ensure your database is not in maintenance mode');
    console.log('4. Check if there are any IP restrictions on your project');
    console.log('5. Try regenerating your API keys if the issue persists');
    console.log('6. Visit: https://supabase.com/dashboard/project/xctamnjglrsxhgzszkai');
}

diagnoseConnection().catch(console.error);