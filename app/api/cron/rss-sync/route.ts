
import { NextResponse } from 'next/server';
import { fetchAndProcessAllFeeds } from '@/lib/rss-fetcher';
import { addRSSPosts } from '@/lib/blog';

export const dynamic = 'force-static';

// This endpoint can be called by external cron services or internal schedulers
export async function GET() {
  try {
    console.log('Daily RSS sync started at:', new Date().toISOString());
    
    const rssPosts = await fetchAndProcessAllFeeds();
    
    if (rssPosts.length > 0) {
      addRSSPosts(rssPosts);
      console.log(`Daily sync: Added ${rssPosts.length} RSS posts`);
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      postsAdded: rssPosts.length,
      message: `Daily RSS sync completed. Added ${rssPosts.length} posts.`
    });
  } catch (error) {
    console.error('Daily RSS sync error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Daily RSS sync failed',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
