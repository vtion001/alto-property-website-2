
import { NextResponse } from 'next/server';
import { fetchAndProcessAllFeeds } from '@/lib/rss-fetcher';
import { addRSSPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export async function POST() {
  try {
    console.log('Starting RSS feed sync...');
    const rssPosts = await fetchAndProcessAllFeeds();
    
    if (rssPosts.length > 0) {
      addRSSPosts(rssPosts);
      console.log(`Successfully synced ${rssPosts.length} RSS posts`);
      
      return NextResponse.json({
        success: true,
        message: `Successfully synced ${rssPosts.length} posts from RSS feeds`,
        postsAdded: rssPosts.length
      });
    } else {
      return NextResponse.json({
        success: true,
        message: 'No new posts found from RSS feeds today',
        postsAdded: 0
      });
    }
  } catch (error) {
    console.error('RSS sync error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync RSS feeds',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'RSS Sync endpoint is active. Use POST to trigger sync.',
    feeds: [
      'RealEstate.com.au',
      'Realty.com.au',
      'First National',
      'The Real Estate Conversation'
    ]
  });
}
