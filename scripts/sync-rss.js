
const { fetchAndProcessAllFeeds } = require('../lib/rss-fetcher.ts');

async function syncRSS() {
  console.log('🔄 Starting RSS feed sync...');
  
  try {
    // This would normally be handled by the blog system
    const rssPosts = await fetchAndProcessAllFeeds();
    console.log(`✅ Successfully fetched ${rssPosts.length} RSS posts`);
    
    // Save to JSON file for static generation
    const fs = require('fs');
    const path = require('path');
    
    const publicBlogDir = path.join(process.cwd(), 'public/blog');
    if (!fs.existsSync(publicBlogDir)) {
      fs.mkdirSync(publicBlogDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(publicBlogDir, 'rss-posts.json'),
      JSON.stringify(rssPosts, null, 2)
    );
    
    console.log('💾 RSS posts saved to public/blog/rss-posts.json');
    console.log('🎉 RSS sync completed successfully!');
    
  } catch (error) {
    console.error('❌ RSS sync failed:', error.message);
    process.exit(1);
  }
}

syncRSS();
