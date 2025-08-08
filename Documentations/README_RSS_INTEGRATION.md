
# RSS Feed Integration for Alto Property Group Blog

## Overview
The blog now automatically fetches and displays content from leading Australian real estate publications to provide comprehensive market coverage.

## RSS Sources
1. **RealEstate.com.au** - Up to 2 posts per day
2. **Realty.com.au** - Up to 2 posts per day  
3. **First National** - Up to 1 post per day
4. **The Real Estate Conversation** - Up to 2 posts per day

## Features
- **Automatic Content Aggregation**: Fetches latest articles from external RSS feeds
- **Content Formatting**: Converts RSS items to blog post format with proper styling
- **External Post Indicators**: Clear labeling of content sourced from external publications
- **Original Source Links**: Direct links to read full articles on original websites
- **Rate Limiting**: Respects daily post limits per source
- **Admin Management**: Manual sync capability through admin interface

## Manual Sync
1. Navigate to `/blog/admin`
2. Use the "Sync RSS Feeds" button in the RSS Feed Management section
3. The system will fetch today's posts from all configured RSS sources

## Automated Sync
- **Endpoint**: `/api/cron/rss-sync`
- **Method**: GET
- **Purpose**: Can be called by external cron services for daily automated syncing
- **Recommended Schedule**: Once daily at 9 AM AEST

## Content Handling
- External posts are clearly marked with "External" badges
- Full article content remains on original websites
- Summary/excerpt is displayed with clear attribution
- "Continue Reading" sections link back to original sources
- Proper SEO handling with nofollow attributes for external links

## Technical Implementation
- **RSS Parser**: Custom XML parser for handling various RSS formats
- **Content Cleaning**: HTML tag stripping and entity decoding
- **Slug Generation**: Automatic URL-friendly slug creation with source prefixes
- **Error Handling**: Graceful failure handling for unavailable feeds

## Usage Examples
```bash
# Manual sync via API
curl -X POST https://yoursite.com/api/rss/sync

# Daily automated sync (for cron services)
curl https://yoursite.com/api/cron/rss-sync
```

## Monitoring
- Check console logs for sync status
- Admin interface shows sync results
- Failed syncs won't break existing functionality
- Each RSS source is processed independently
