
const fs = require('fs');
const path = require('path');

const RSS_FEEDS = [
  {
    url: 'https://www.realestate.com.au/news/feed',
    name: 'RealEstate.com.au',
    maxPostsPerDay: 2
  },
  {
    url: 'http://channels.realty.com.au/feed',
    name: 'Realty.com.au',
    maxPostsPerDay: 2
  },
  {
    url: 'https://content.firstnational.com.au/feed',
    name: 'First National',
    maxPostsPerDay: 1
  },
  {
    url: 'https://therealestateconversation.com.au/feed',
    name: 'The Real Estate Conversation',
    maxPostsPerDay: 2
  }
];

async function fetchRSSFeed(feedUrl) {
  try {
    const response = await fetch(feedUrl);
    const xmlText = await response.text();
    return parseRSSXML(xmlText);
  } catch (error) {
    console.error(`Failed to fetch ${feedUrl}:`, error);
    return [];
  }
}

function parseRSSXML(xmlText) {
  const items = [];
  const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi);
  
  if (!itemMatches) return items;
  
  for (const itemXml of itemMatches) {
    try {
      const title = extractXMLContent(itemXml, 'title') || 'Untitled';
      const link = extractXMLContent(itemXml, 'link') || '';
      const description = extractXMLContent(itemXml, 'description') || '';
      const pubDate = extractXMLContent(itemXml, 'pubDate') || new Date().toISOString();
      const author = extractXMLContent(itemXml, 'author') || extractXMLContent(itemXml, 'dc:creator') || 'Unknown';
      const category = extractXMLContent(itemXml, 'category') || 'Real Estate News';
      
      items.push({
        title: cleanHTMLTags(title),
        link,
        description: cleanHTMLTags(description),
        pubDate,
        author: cleanHTMLTags(author),
        category: cleanHTMLTags(category)
      });
    } catch (error) {
      console.error('Error parsing RSS item:', error);
    }
  }
  
  return items;
}

function extractXMLContent(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function cleanHTMLTags(text) {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function generateBlogHTML(posts) {
  const blogPostsHTML = posts.map((post, index) => {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 100);
    const postSlug = `rss-${slug}`;
    
    return `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Market Intel</span>
          <span class="text-sm text-gray-500">${new Date(post.pubDate).toLocaleDateString()}</span>
        </div>
        <h3 class="text-xl font-semibold text-brown-900 mb-3 hover:text-brown-700">
          <a href="/blog/${postSlug}">${post.title}</a>
        </h3>
        <p class="text-gray-700 mb-4 leading-relaxed">${post.description.substring(0, 150)}...</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">By Alto Property Group</span>
          <a href="/blog/${postSlug}" 
             class="inline-flex items-center text-brown-600 hover:text-brown-800 transition-colors">
            Read Our Analysis →
          </a>
        </div>
      </div>
    </div>
  `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Market Insights - Alto Property Group</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brown: {
                            50: '#fdf8f6',
                            100: '#f2e8e5',
                            200: '#eaddd7',
                            300: '#e0cec7',
                            400: '#d2bab0',
                            500: '#bfa094',
                            600: '#a18072',
                            700: '#977669',
                            800: '#846358',
                            900: '#43302b',
                        },
                        cream: '#faf7f2',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-brown-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-light text-brown-900">Alto Property Group</a>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="/buying" class="text-brown-700 hover:text-brown-900 px-3 py-2 text-sm font-medium">Buying</a>
                        <a href="/selling" class="text-brown-700 hover:text-brown-900 px-3 py-2 text-sm font-medium">Selling</a>
                        <a href="/renting" class="text-brown-700 hover:text-brown-900 px-3 py-2 text-sm font-medium">Renting</a>
                        <a href="/blog" class="text-brown-900 px-3 py-2 text-sm font-medium border-b-2 border-brown-900">Blog</a>
                        <a href="/contact" class="text-brown-700 hover:text-brown-900 px-3 py-2 text-sm font-medium">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative py-24 lg:py-32 bg-gradient-to-br from-cream via-white to-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center space-y-8">
                <div class="inline-block">
                    <div class="text-xs tracking-wider text-brown-600 uppercase mb-2">Property Insights</div>
                    <div class="w-16 h-px bg-brown-300 mx-auto"></div>
                </div>
                <h1 class="text-5xl font-extralight tracking-tight sm:text-6xl lg:text-7xl text-brown-800 leading-none">
                    Property
                    <span class="block font-light text-brown-700 mt-2">Market</span>
                    <span class="block font-extralight text-brown-600 mt-2">Insights</span>
                </h1>
                <p class="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                    Stay informed with the latest property market trends, investment tips, and expert insights from our experienced team at Alto Property Group, plus curated content from Australia's leading real estate publications.
                </p>
            </div>
        </div>
    </section>

    <!-- Blog Posts -->
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                ${blogPostsHTML}
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-brown-900 text-cream py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <p class="text-brown-200">© ${new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        // Auto-refresh every hour to get latest posts
        setTimeout(() => {
            window.location.reload();
        }, 3600000);
    </script>
</body>
</html>
  `;
}

async function buildStaticBlog() {
  console.log('Fetching RSS feeds and generating static blog...');
  
  const allPosts = [];
  
  for (const feed of RSS_FEEDS) {
    console.log(`Fetching ${feed.name}...`);
    const posts = await fetchRSSFeed(feed.url);
    const recentPosts = posts.slice(0, feed.maxPostsPerDay);
    allPosts.push(...recentPosts);
  }
  
  // Sort by date (newest first)
  allPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  
  // Generate HTML
  const blogHTML = generateBlogHTML(allPosts);
  
  // Ensure out directory exists
  if (!fs.existsSync('out')) {
    fs.mkdirSync('out', { recursive: true });
  }
  
  if (!fs.existsSync('out/blog')) {
    fs.mkdirSync('out/blog', { recursive: true });
  }
  
  // Write RSS blog page to out directory
  fs.writeFileSync('out/blog/rss-feed.html', blogHTML);
  
  // Also write to public directory for static export
  if (!fs.existsSync('public/blog')) {
    fs.mkdirSync('public/blog', { recursive: true });
  }
  fs.writeFileSync('public/blog/rss-feed.html', blogHTML);
  
  // Also create a JSON file for potential integration
  const postsJSON = JSON.stringify(allPosts, null, 2);
  fs.writeFileSync('out/blog/rss-posts.json', postsJSON);
  fs.writeFileSync('public/blog/rss-posts.json', postsJSON);
  
  console.log(`Generated static RSS blog with ${allPosts.length} posts`);
  console.log('Files created:');
  console.log('- out/blog/rss-feed.html (Static HTML page)');
  console.log('- out/blog/rss-posts.json (JSON data)');
}

// Run the build
buildStaticBlog().catch(console.error);
