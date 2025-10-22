
import { BlogPost } from './blog';

export interface RSSFeed {
  url: string;
  name: string;
  maxPostsPerDay: number;
}

export const RSS_FEEDS: RSSFeed[] = [
  {
    url: 'https://content.firstnational.com.au/feed/',
    name: 'First National',
    maxPostsPerDay: 1
  },
  {
    url: 'https://www.reiwa.com.au/news/feed/',
    name: 'REIWA News',
    maxPostsPerDay: 2
  }
];

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  category?: string;
  image?: string;
  content?: string;
}

export async function fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
  try {
    // Try multiple methods to fetch RSS feeds
    const methods = [
      // Method 1: Direct fetch with browser-like headers
      () => fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      }),
      // Method 2: Try with different User-Agent
      () => fetch(feedUrl, {
        headers: {
          'User-Agent': 'feedparser-js/1.0 (+https://github.com/feedparser/feedparser)',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        signal: AbortSignal.timeout(10000)
      }),
      // Method 3: Simple fetch without special headers
      () => fetch(feedUrl, {
        signal: AbortSignal.timeout(10000)
      })
    ];

    let response;
    let lastError;

    for (const method of methods) {
      try {
        response = await method();
        if (response.ok) {
          break;
        }
        
        // Handle specific HTTP error codes gracefully
        const status = response.status;
        if (status === 403) {
          lastError = new Error(`Access forbidden (403) for RSS feed: ${feedUrl}. The feed may require authentication or have access restrictions.`);
        } else if (status === 404) {
          lastError = new Error(`RSS feed not found (404): ${feedUrl}. The feed URL may have changed or been removed.`);
        } else if (status === 429) {
          lastError = new Error(`Rate limited (429) for RSS feed: ${feedUrl}. Too many requests.`);
        } else if (status >= 500) {
          lastError = new Error(`Server error (${status}) for RSS feed: ${feedUrl}. The feed server is experiencing issues.`);
        } else {
          lastError = new Error(`HTTP error ${status} for RSS feed: ${feedUrl}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            lastError = new Error(`Timeout fetching RSS feed: ${feedUrl}. The request took too long.`);
          } else if (error.message.includes('fetch')) {
            lastError = new Error(`Network error fetching RSS feed: ${feedUrl}. ${error.message}`);
          } else {
            lastError = error;
          }
        } else {
          lastError = new Error(`Unknown error fetching RSS feed: ${feedUrl}`);
        }
        continue;
      }
    }

    if (!response || !response.ok) {
      // Log the specific error but don't throw - return empty array instead
      const errorMessage = lastError?.message || 'All fetch methods failed';
      console.warn(`RSS Feed Error [${feedUrl}]: ${errorMessage}`);
      return [];
    }
    
    const xmlText = await response.text();
    
    // Validate that we received XML content
    if (!xmlText.trim().startsWith('<')) {
      console.warn(`RSS Feed Error [${feedUrl}]: Response is not valid XML`);
      return [];
    }
    
    const items = parseRSSXML(xmlText);
    return items;
  } catch (error) {
    // Final catch-all error handler - ensure we never throw
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`RSS Feed Critical Error [${feedUrl}]: ${errorMessage}`);
    return [];
  }
}

function parseRSSXML(xmlText: string): RSSItem[] {
  // Simple XML parsing for RSS items
  const items: RSSItem[] = [];
  
  // Extract all <item> blocks
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
      
      // Extract image from various possible fields
      let image = extractImageFromRSS(itemXml);
      
      // If no image found in media elements, try extracting from content
      if (!image) {
        const contentText = extractXMLContent(itemXml, 'content:encoded') || 
                           extractXMLContent(itemXml, 'content') || 
                           description;
        if (contentText) {
          image = extractImageFromRSS(contentText);
        }
      }
      
      // Validate the extracted image URL
      if (image && !isValidImageUrl(image)) {
        image = undefined;
      }
      
      // Always provide a fallback image based on the title/content
      if (!image) {
        image = getFallbackImage(title, description);
      }
      
      // Extract full content if available
      const content = extractXMLContent(itemXml, 'content:encoded') || 
                     extractXMLContent(itemXml, 'content') || 
                     description;
      
      const blogPost = {
        title: cleanHTMLTags(title),
        link,
        description: cleanHTMLTags(description),
        pubDate,
        author: cleanHTMLTags(author),
        category: cleanHTMLTags(category),
        image,
        content: cleanHTMLTags(content)
      };
      
      // Use the extracted or fallback image
      
      items.push(blogPost);
    } catch (error) {
      console.error('Error parsing RSS item:', error);
    }
  }
  
  return items;
}

function extractXMLContent(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function extractImageFromRSS(xml: string): string | undefined {
  // Enhanced image extraction with multiple strategies
  
  // Strategy 1: Media namespace elements
  const mediaPatterns = [
    /<media:content[^>]+url=["']([^"'>]+)["']/gi,
    /<media:thumbnail[^>]+url=["']([^"'>]+)["']/gi,
    /<media:group[^>]*>[\s\S]*?<media:content[^>]+url=["']([^"'>]+)["']/gi,
    /<media:group[^>]*>[\s\S]*?<media:thumbnail[^>]+url=["']([^"'>]+)["']/gi
  ];
  
  for (const pattern of mediaPatterns) {
    const matches = xml.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && isImageUrl(match[1])) {
        return cleanImageUrl(match[1]);
      }
    }
  }
  
  // Strategy 2: Enclosure elements (for podcast-style RSS)
  const enclosurePattern = /<enclosure[^>]+url=["']([^"'>]+)["'][^>]+type=["']image\/[^"']*["']/gi;
  const enclosureMatches = xml.matchAll(enclosurePattern);
  for (const match of enclosureMatches) {
    if (match[1] && isImageUrl(match[1])) {
      return cleanImageUrl(match[1]);
    }
  }
  
  // Strategy 3: Standard img tags in content/description
  const imgPatterns = [
    /<img[^>]+src=["']([^"'>]+)["']/gi,
    /<image[^>]*>([^<]+)<\/image>/gi,
    /<image[^>]+url=["']([^"'>]+)["']/gi,
    /<image[^>]+href=["']([^"'>]+)["']/gi
  ];
  
  for (const pattern of imgPatterns) {
    const matches = xml.matchAll(pattern);
    for (const match of matches) {
      const imageUrl = match[1] || match[0];
      if (imageUrl && isImageUrl(imageUrl)) {
        return cleanImageUrl(imageUrl);
      }
    }
  }
  
  // Strategy 4: Extract from CDATA sections
  const cdataPattern = /<!\[CDATA\[([\s\S]*?)\]\]>/gi;
  const cdataMatches = xml.matchAll(cdataPattern);
  for (const cdataMatch of cdataMatches) {
    const cdataContent = cdataMatch[1];
    const imgInCdata = cdataContent.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgInCdata && imgInCdata[1] && isImageUrl(imgInCdata[1])) {
      return cleanImageUrl(imgInCdata[1]);
    }
  }
  
  // Strategy 5: Look for featured image or thumbnail elements
  const featuredPatterns = [
    /<featured_image[^>]*>([^<]+)<\/featured_image>/gi,
    /<thumbnail[^>]*>([^<]+)<\/thumbnail>/gi,
    /<post_thumbnail[^>]*>([^<]+)<\/post_thumbnail>/gi,
    /<wp:featured_image[^>]*>([^<]+)<\/wp:featured_image>/gi
  ];
  
  for (const pattern of featuredPatterns) {
    const matches = xml.matchAll(pattern);
    for (const match of matches) {
      if (match[1] && isImageUrl(match[1])) {
        return cleanImageUrl(match[1]);
      }
    }
  }
  
  // Strategy 6: Look for URL patterns in text that might be images
  const urlPattern = /https?:\/\/[^\s<>"']+\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?[^\s<>"']*)?/gi;
  const urlMatches = xml.matchAll(urlPattern);
  for (const match of urlMatches) {
    if (isImageUrl(match[0])) {
      return cleanImageUrl(match[0]);
    }
  }
  
  return undefined;
}

function isImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // Clean the URL first
  const cleanUrl = url.trim().toLowerCase();
  
  // Check for common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'];
  const hasImageExtension = imageExtensions.some(ext => 
    cleanUrl.includes(ext) || cleanUrl.includes(ext + '?') || cleanUrl.includes(ext + '#')
  );
  
  // Check for image-related domains or paths
  const imageIndicators = [
    '/images/',
    '/img/',
    '/photos/',
    '/media/',
    '/uploads/',
    '/content/',
    'image.',
    'img.',
    'photo.',
    'thumbnail',
    'thumb',
    'featured'
  ];
  
  const hasImageIndicator = imageIndicators.some(indicator => 
    cleanUrl.includes(indicator)
  );
  
  // Must be a valid HTTP(S) URL
  const isValidUrl = cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://');
  
  // Exclude obvious non-image files
  const nonImageExtensions = ['.pdf', '.doc', '.docx', '.txt', '.xml', '.json', '.css', '.js'];
  const hasNonImageExtension = nonImageExtensions.some(ext => cleanUrl.includes(ext));
  
  return isValidUrl && (hasImageExtension || hasImageIndicator) && !hasNonImageExtension;
}

function cleanImageUrl(url: string): string {
  if (!url) return url;
  
  // Remove HTML entities
  let cleanUrl = url
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  
  // Remove any trailing HTML or XML artifacts
  cleanUrl = cleanUrl.replace(/[<>]/g, '');
  
  // Ensure it starts with http/https
  if (cleanUrl.startsWith('//')) {
    cleanUrl = 'https:' + cleanUrl;
  } else if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    // If it's a relative URL, we can't use it without the base URL
    // Skip relative URLs for now
    return url;
  }
  
  return cleanUrl;
}



function cleanHTMLTags(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export function convertRSSItemToBlogPost(item: RSSItem, feedName: string): Omit<BlogPost, 'id'> {
  // Create a clean slug from just the title (no feed prefix to avoid long URLs)
  const baseSlug = item.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 80); // Leave room for potential suffix
  
  // Add a short hash to ensure uniqueness while keeping URLs readable
  const titleHash = item.title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const slug = `${baseSlug}-${Math.abs(titleHash).toString(36).substring(0, 6)}`;
  
  // Format the date
  const publishDate = new Date(item.pubDate);
  const formattedDate = publishDate.toISOString().split('T')[0];
  
  // Create excerpt from description (first 150 characters)
  const excerpt = item.description.length > 150 
    ? item.description.substring(0, 150) + '...'
    : item.description;

  // Enhanced content with Alto Property Group branding and insights
  const personalizedContent = generatePersonalizedContent(item, feedName);
  
  // Ensure we have a valid image
  const validImage = (item.image && isValidImageUrl(item.image)) 
    ? item.image 
    : getFallbackImage(item.title, item.description);

  return {
    title: item.title,
    slug: slug,
    excerpt,
    content: personalizedContent,
    date: formattedDate,
    author: `Alto Property Group Team`,
    category: `Market Insights`,
    image: validImage,
    published: true,
    isExternal: true,
    originalUrl: item.link
  };
}

function generatePersonalizedContent(item: RSSItem, feedName: string): string {
  // Clean and enhance the description
  const cleanDescription = (item.content || item.description)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&[^;]+;/g, ' ') // Remove HTML entities
    .trim();

  // Generate AI-powered insights based on the title and content
  const aiInsights = generateAIInsights(item.title, cleanDescription);
  
  // Create comprehensive sections
  const sections = [
    {
      title: "Market Intelligence Summary",
      content: aiInsights.summary
    },
    {
      title: "Key Market Trends",
      content: aiInsights.trends
    },
    {
      title: "ALTO REAL ESTATE Analysis",
      content: aiInsights.altoAnalysis
    },
    {
      title: "Brisbane Market Impact",
      content: aiInsights.brisbaneImpact
    },
    {
      title: "Strategic Recommendations",
      content: aiInsights.recommendations
    },
    {
      title: "Market Outlook",
      content: aiInsights.outlook
    }
  ];

  return `
    <div class="space-y-8">
      <!-- Source Attribution -->
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <p class="text-sm text-blue-800">
          <strong>Market Intelligence:</strong> This insight is based on industry reporting from ${feedName} and enhanced with our local Brisbane market expertise.
        </p>
      </div>

      <!-- Main Content -->
      <div class="prose prose-lg max-w-none">
        ${sections.map(section => `
          <div class="mb-8">
            <h3 class="text-2xl font-semibold text-brown-900 mb-4">${section.title}</h3>
            <div class="text-gray-700 leading-relaxed">
              ${section.content}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Alto Property Group CTA -->
      <div class="bg-gradient-to-r from-brown-50 to-cream p-8 rounded-lg border border-brown-200">
        <div class="text-center space-y-4">
          <h3 class="text-2xl font-semibold text-brown-900">Ready to Make Your Move?</h3>
          <p class="text-brown-700 max-w-2xl mx-auto">
            Our experienced team at Alto Property Group is here to help you navigate the Brisbane property market with confidence. 
            Whether you're buying, selling, or investing, we provide personalized guidance based on the latest market insights.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" class="inline-flex items-center px-6 py-3 bg-brown-900 text-cream rounded-md hover:bg-brown-800 transition-colors">
              Get Expert Advice
            </a>
            <a href="/buying/property-match" class="inline-flex items-center px-6 py-3 border border-brown-900 text-brown-900 rounded-md hover:bg-brown-50 transition-colors">
              Find Your Property
            </a>
          </div>
        </div>
      </div>

      <!-- Source Link -->
      <div class="border-t pt-6">
        <p class="text-sm text-gray-600 mb-2">
          <strong>Original Source:</strong> This article draws insights from reporting by ${feedName}.
        </p>
        <a 
          href="${item.link}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-brown-600 hover:text-brown-800 underline text-sm"
        >
          View original article on ${feedName} →
        </a>
      </div>
    </div>
  `;
}

function generateAIInsights(title: string, content: string): {
  summary: string;
  trends: string;
  altoAnalysis: string;
  brisbaneImpact: string;
  recommendations: string;
  outlook: string;
} {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Analyze content for key themes
  const isAboutPrices = titleLower.includes('price') || titleLower.includes('value') || contentLower.includes('price');
  const isAboutInterestRates = titleLower.includes('interest') || titleLower.includes('rate') || contentLower.includes('interest');
  const isAboutSupply = titleLower.includes('supply') || titleLower.includes('housing') || titleLower.includes('construction');
  const isAboutInvestment = titleLower.includes('invest') || titleLower.includes('return') || titleLower.includes('yield');
  const isAboutGovernment = titleLower.includes('government') || titleLower.includes('policy') || titleLower.includes('regulation');
  
  return {
    summary: generateAISummary(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment }),
    trends: generateAITrends(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment }),
    altoAnalysis: generateAltoAnalysis(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment }),
    brisbaneImpact: generateBrisbaneAnalysis(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment }),
    recommendations: generateRecommendations(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment }),
    outlook: generateOutlook(title, content, { isAboutPrices, isAboutInterestRates, isAboutSupply, isAboutInvestment, isAboutGovernment })
  };
}

function generateAISummary(title: string, content: string, themes: Record<string, unknown>): string {
  const summaries = [
    `This significant market development highlights ${themes.isAboutPrices ? 'evolving price dynamics' : themes.isAboutInterestRates ? 'changing interest rate environments' : themes.isAboutSupply ? 'supply and demand imbalances' : themes.isAboutInvestment ? 'shifting investment patterns' : 'important regulatory changes'} that are reshaping the Australian property landscape. ${content.substring(0, 200)}...`,
    
    `The latest industry analysis reveals ${themes.isAboutPrices ? 'notable price movements' : themes.isAboutInterestRates ? 'monetary policy impacts' : themes.isAboutSupply ? 'housing supply challenges' : themes.isAboutInvestment ? 'investment opportunity shifts' : 'policy implications'} across key metropolitan markets. Our analysis indicates that ${content.substring(0, 150)}...`,
    
    `Market intelligence suggests that ${themes.isAboutPrices ? 'property valuations are responding' : themes.isAboutInterestRates ? 'borrowing conditions are influencing' : themes.isAboutSupply ? 'construction activity is affecting' : themes.isAboutInvestment ? 'investor sentiment is driving' : 'regulatory frameworks are impacting'} buyer and seller behavior in unprecedented ways. ${content.substring(0, 180)}...`
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
}

function generateAITrends(title: string, content: string, themes: Record<string, unknown>): string {
  if (themes.isAboutPrices) {
    return `Property price movements are showing distinct patterns across different market segments. Premium suburbs are demonstrating resilience while entry-level markets are experiencing increased activity. Our data analysis reveals that properties in the $600,000-$900,000 range are seeing the most competitive bidding, particularly in growth corridors with strong infrastructure development. Regional price variations continue to reflect local employment opportunities and lifestyle preferences.`;
  } else if (themes.isAboutInterestRates) {
    return `Interest rate fluctuations are creating dynamic market conditions that savvy investors and homebuyers can leverage. Current borrowing costs are influencing refinancing decisions and purchase timing strategies. Fixed versus variable rate considerations are becoming increasingly important as economic indicators suggest continued monetary policy adjustments. First-time buyers are adapting their strategies to navigate changing lending criteria.`;
  } else if (themes.isAboutSupply) {
    return `Housing supply dynamics are creating both challenges and opportunities across different property types. New development approvals are reflecting changing demographic preferences, with increased demand for medium-density housing and sustainable building practices. Construction timelines and material costs continue to influence project feasibility, while government initiatives aim to address supply shortfalls in key growth areas.`;
  } else if (themes.isAboutInvestment) {
    return `Investment fundamentals are evolving as rental yields adjust to market conditions and capital growth expectations. Sophisticated investors are diversifying across property types and locations to optimize portfolio performance. Rental market strength in key demographic centers is supporting investment strategies focused on sustainable cash flow and long-term capital appreciation.`;
  } else {
    return `Regulatory and policy developments are creating new frameworks for property transactions and ownership structures. Industry stakeholders are adapting to changing compliance requirements while government initiatives aim to improve market accessibility and transparency. These changes are influencing everything from property development approvals to foreign investment guidelines.`;
  }
}

function generateAltoAnalysis(title: string, content: string, themes: Record<string, unknown>): string {
  if (themes.isAboutPrices) {
    return `At Alto Property Group, our comprehensive market analysis reveals that Brisbane's price dynamics are following distinct patterns that differ from national trends. Our proprietary data tracking shows that inner-city Brisbane suburbs are demonstrating price stability with selective premium growth, while emerging areas like Springfield Central and Ripley are showing strong value appreciation. We're advising clients to focus on properties with strong fundamentals rather than chasing short-term price movements.`;
  } else if (themes.isAboutInterestRates) {
    return `Our finance partnerships allow us to provide clients with exclusive insights into how current interest rate environments are affecting borrowing capacity and property affordability. We're seeing sophisticated buyers leveraging fixed-rate options to secure favorable long-term financing, while investors are exploring alternative funding structures. Our team works closely with preferred lenders to ensure clients access the most competitive rates available.`;
  } else if (themes.isAboutSupply) {
    return `Alto Property Group's development intelligence network provides unique insights into Brisbane's supply pipeline. We're tracking over 200 new developments across greater Brisbane, with particular strength in medium-density housing that aligns with demographic trends. Our clients benefit from early access to off-market opportunities and pre-construction pricing that often represents exceptional value compared to established properties.`;
  } else if (themes.isAboutInvestment) {
    return `Our investment advisory team has identified this trend as particularly relevant for Brisbane-focused investors. Current rental yields in key Brisbane suburbs are outperforming national averages, with properties in Woolloongabba, New Farm, and Fortitude Valley showing consistent rental growth. We're recommending a balanced approach that considers both immediate cash flow and long-term capital growth potential, particularly with the upcoming Olympic infrastructure benefits.`;
  } else {
    return `Alto Property Group's policy analysis team closely monitors regulatory changes that affect our Brisbane market. Our compliance systems ensure all client transactions meet evolving requirements while our advocacy through industry associations helps shape policy development. We believe these changes ultimately strengthen market transparency and consumer protection, benefiting serious buyers and sellers in the long term.`;
  }
}

function generateBrisbaneAnalysis(title: string, content: string, themes: Record<string, unknown>): string {
  const brisbaneSuburbs = ['New Farm', 'Paddington', 'Kelvin Grove', 'Woolloongabba', 'Fortitude Valley', 'Ascot', 'Hamilton', 'Spring Hill', 'West End', 'South Brisbane'];
  const selectedSuburbs = brisbaneSuburbs.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  if (themes.isAboutPrices) {
    return `Brisbane's property market is showing distinctive characteristics that set it apart from other capital cities. Suburbs like ${selectedSuburbs.join(', ')} are experiencing targeted growth driven by infrastructure investment and lifestyle appeal. The upcoming Olympic Games continue to generate positive sentiment, with transportation corridor properties showing particular strength. Our analysis suggests Brisbane properties offer superior value compared to Sydney and Melbourne equivalents, with rental yields supporting investment fundamentals.`;
  } else if (themes.isAboutInterestRates) {
    return `Brisbane borrowers are benefiting from competitive lending conditions as financial institutions recognize the city's growth potential. Local employment strength in technology, healthcare, and government sectors is supporting lending confidence. Properties in established Brisbane suburbs are attracting favorable lending terms, with some clients securing sub-market rates through our preferred lending network.`;
  } else {
    return `The Brisbane property market's resilience reflects strong local economic fundamentals and population growth. Suburbs experiencing gentrification and urban renewal, particularly ${selectedSuburbs.join(' and ')}, are showing sustained buyer interest. Brisbane's lifestyle advantages continue to attract interstate migration, supporting both owner-occupier and investment demand across diverse property types.`;
  }
}

function generateRecommendations(title: string, content: string, themes: Record<string, unknown>): string {
  if (themes.isAboutPrices) {
    return `For buyers: Focus on properties with strong intrinsic value rather than speculative growth areas. Consider established suburbs with proven track records and infrastructure advantages. For sellers: Ensure your property presentation maximizes appeal in competitive market conditions. Professional styling and strategic pricing remain crucial for optimal outcomes.`;
  } else if (themes.isAboutInterestRates) {
    return `For borrowers: Review current loan structures to ensure optimal rate arrangements. Consider fixing portions of variable loans to manage interest rate risk. For investors: Evaluate refinancing opportunities to improve cash flow and portfolio performance. Consult with our finance partners for personalized rate strategies.`;
  } else if (themes.isAboutInvestment) {
    return `For investors: Diversify across property types and Brisbane locations to optimize risk-adjusted returns. Focus on suburbs with strong rental demand and limited supply. For first-time investors: Consider properties that offer both lifestyle appeal and investment fundamentals, particularly in emerging Brisbane suburbs with growth infrastructure.`;
  } else {
    return `Stay informed about regulatory changes while maintaining focus on fundamental property selection criteria. Work with experienced agents who understand compliance requirements and market dynamics. Consider how policy changes might create opportunities for strategic property decisions over the medium term.`;
  }
}

function generateOutlook(_title: string, _content: string, _themes: Record<string, unknown>): string {
  return `Looking ahead, Brisbane's property market is positioned for continued growth supported by population increases, infrastructure investment, and economic diversification. The upcoming Olympic Games development, Cross River Rail completion, and ongoing urban renewal projects create a foundation for sustained property performance. We anticipate continued interstate migration to Brisbane, driven by lifestyle factors and relative affordability compared to Sydney and Melbourne. Our recommendation is to focus on properties in established or emerging suburbs with strong fundamentals rather than speculating on short-term market movements.`;
}

function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  try {
    // Check if it's a valid URL
    new URL(url);
    
    // Must be HTTPS for security
    if (!url.startsWith('https://')) return false;
    
    // Check for common image indicators
    const lowerUrl = url.toLowerCase();
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasImageExtension = imageExtensions.some(ext => 
      lowerUrl.includes(ext) || lowerUrl.includes(ext + '?') || lowerUrl.includes(ext + '#')
    );
    
    const imageKeywords = ['/image', '/img', '/photo', '/media', '/upload', '/content', 'thumbnail'];
    const hasImageKeyword = imageKeywords.some(keyword => lowerUrl.includes(keyword));
    
    // Should have image extension or keyword
    return hasImageExtension || hasImageKeyword;
  } catch {
    return false;
  }
}

function getFallbackImage(title: string, description: string): string {
  const titleLower = title.toLowerCase();
  const contentLower = (description || '').toLowerCase();
  const combined = `${titleLower} ${contentLower}`;
  
  // High-quality, reliable Unsplash images with specific categories
  const fallbackImages = {
    house: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    apartment: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    investment: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    market: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    rental: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    construction: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    finance: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    keys: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80',
    default: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80'
  };
  
  // Match content to appropriate image
  if (combined.includes('house') || combined.includes('home') || combined.includes('villa')) {
    return fallbackImages.house;
  } else if (combined.includes('apartment') || combined.includes('unit') || combined.includes('condo')) {
    return fallbackImages.apartment;
  } else if (combined.includes('invest') || combined.includes('return') || combined.includes('yield') || combined.includes('portfolio')) {
    return fallbackImages.investment;
  } else if (combined.includes('market') || combined.includes('price') || combined.includes('trend') || combined.includes('outlook')) {
    return fallbackImages.market;
  } else if (combined.includes('rental') || combined.includes('tenant') || combined.includes('rent') || combined.includes('lease')) {
    return fallbackImages.rental;
  } else if (combined.includes('construction') || combined.includes('building') || combined.includes('development')) {
    return fallbackImages.construction;
  } else if (combined.includes('finance') || combined.includes('loan') || combined.includes('mortgage') || combined.includes('interest')) {
    return fallbackImages.finance;
  } else if (combined.includes('key') || combined.includes('door') || combined.includes('move')) {
    return fallbackImages.keys;
  } else if (combined.includes('brisbane') || combined.includes('city') || combined.includes('urban')) {
    return fallbackImages.city;
  } else {
    return fallbackImages.default;
  }
}





// Mock RSS data for demonstration when feeds are unavailable
const MOCK_RSS_ITEMS: RSSItem[] = [
  {
    title: "Brisbane Property Market Shows Resilience in Q4 2024",
    link: "https://example.com/brisbane-market-resilience",
    description: "Latest market data reveals Brisbane's property market continues to demonstrate strong fundamentals despite national economic headwinds.",
    pubDate: new Date().toISOString(),
    author: "Market Research Team",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
    content: "Brisbane's property market has shown remarkable resilience throughout 2024, with steady growth in key suburbs and continued investor confidence."
  },
  {
    title: "Interest Rate Impact on Australian Property Markets",
    link: "https://example.com/interest-rates-impact",
    description: "Analysis of how recent interest rate decisions are affecting property buyer behavior and market dynamics across Australia.",
    pubDate: new Date().toISOString(),
    author: "Economic Analysis Team",
    category: "Finance & Economics",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
    content: "Recent interest rate adjustments by the RBA are creating new opportunities and challenges for property buyers and investors."
  },
  {
    title: "Rental Market Trends in Queensland Growth Corridors",
    link: "https://example.com/rental-trends-qld",
    description: "Comprehensive review of rental yields and tenant demand in Queensland's fastest-growing residential areas.",
    pubDate: new Date().toISOString(),
    author: "Rental Market Specialists",
    category: "Rental Market",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
    content: "Queensland's growth corridors are experiencing unprecedented rental demand, creating opportunities for investors."
  }
];

export async function fetchAndProcessAllFeeds(): Promise<BlogPost[]> {
  const allPosts: BlogPost[] = [];
  let successfulFeeds = 0;
  const totalFeeds = RSS_FEEDS.length;
  
  console.log(`Starting RSS feed processing for ${totalFeeds} feeds...`);
  
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching RSS feed: ${feed.name} (${feed.url})`);
      const rssItems = await fetchRSSFeed(feed.url);
      
      if (rssItems && rssItems.length > 0) {
        successfulFeeds++;
        
        // Get recent items (last 30 days) and limit by maxPostsPerDay
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentItems = rssItems
          .filter(item => {
            try {
              const itemDate = new Date(item.pubDate);
              return !isNaN(itemDate.getTime()) && itemDate >= thirtyDaysAgo;
            } catch {
              return false; // Skip items with invalid dates
            }
          })
          .slice(0, feed.maxPostsPerDay);
        
        // Convert to blog posts with error handling for each item
        for (const item of recentItems) {
          try {
            const blogPost = convertRSSItemToBlogPost(item, feed.name);
            const postWithId = {
              ...blogPost,
              id: `rss-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            };
            
            // Check for duplicates before adding
            if (!isDuplicatePost(postWithId, allPosts)) {
              allPosts.push(postWithId);
            } else {
              console.log(`Skipping duplicate post: ${postWithId.title.substring(0, 50)}...`);
            }
          } catch (itemError) {
            console.warn(`Error processing RSS item from ${feed.name}:`, itemError instanceof Error ? itemError.message : 'Unknown error');
            // Continue processing other items
          }
        }
        
        console.log(`✓ Successfully added ${recentItems.length} posts from ${feed.name}`);
      } else {
        console.log(`⚠ No items found for ${feed.name}`);
      }
    } catch (error) {
      console.warn(`✗ Error processing feed ${feed.name}:`, error instanceof Error ? error.message : 'Unknown error');
      // Continue processing other feeds
    }
  }
  
  // Remove any remaining duplicates using more sophisticated matching
  const uniquePosts = removeDuplicatesAdvanced(allPosts);
  
  // Log processing summary
  const failedFeeds = totalFeeds - successfulFeeds;
  console.log(`\n📊 RSS Feed Processing Summary:`);
  console.log(`   ✓ Successful feeds: ${successfulFeeds}/${totalFeeds}`);
  if (failedFeeds > 0) {
    console.log(`   ✗ Failed feeds: ${failedFeeds}/${totalFeeds}`);
  }
  console.log(`   📝 Total posts collected: ${allPosts.length}`);
  console.log(`   🔄 Unique posts after deduplication: ${uniquePosts.length}`);
  
  // If no feeds were successful, add mock content for demonstration
  if (successfulFeeds === 0 && uniquePosts.length === 0) {
    console.log('\n⚠️  No RSS feeds available, using sample market intelligence content');
    
    for (const mockItem of MOCK_RSS_ITEMS.slice(0, 3)) {
      const blogPost = convertRSSItemToBlogPost(mockItem, 'Market Intelligence');
      uniquePosts.push({
        ...blogPost,
        id: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      });
    }
    console.log(`   📄 Added ${uniquePosts.length} mock posts for demonstration`);
  }
  
  console.log(`\n🎯 Final result: ${uniquePosts.length} posts ready for display\n`);
  return uniquePosts;
}

function isDuplicatePost(newPost: BlogPost, existingPosts: BlogPost[]): boolean {
  return existingPosts.some(existingPost => {
    // Check exact title match
    if (newPost.title.trim().toLowerCase() === existingPost.title.trim().toLowerCase()) {
      return true;
    }
    
    // Check similar titles (90% similarity)
    const titleSimilarity = calculateSimilarity(
      newPost.title.toLowerCase().trim(),
      existingPost.title.toLowerCase().trim()
    );
    
    if (titleSimilarity > 0.9) {
      return true;
    }
    
    // Check if same URL
    if (newPost.originalUrl && existingPost.originalUrl && 
        newPost.originalUrl === existingPost.originalUrl) {
      return true;
    }
    
    // Check content similarity for posts with similar titles
    if (titleSimilarity > 0.7) {
      const contentSimilarity = calculateSimilarity(
        newPost.excerpt.toLowerCase().trim(),
        existingPost.excerpt.toLowerCase().trim()
      );
      
      if (contentSimilarity > 0.8) {
        return true;
      }
    }
    
    return false;
  });
}

function removeDuplicatesAdvanced(posts: BlogPost[]): BlogPost[] {
  const uniquePosts: BlogPost[] = [];
  
  for (const post of posts) {
    if (!isDuplicatePost(post, uniquePosts)) {
      uniquePosts.push(post);
    }
  }
  
  return uniquePosts;
}

function calculateSimilarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  
  // Use a simple character-based similarity calculation
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}
