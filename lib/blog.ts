export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  published: boolean;
  isExternal?: boolean;
  originalUrl?: string;
}

// RSS functionality removed for static deployment

// Static blog posts data for export
let blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Brisbane Property Market Outlook 2024",
    slug: "brisbane-property-market-outlook-2024",
    excerpt: "Discover the key trends shaping Brisbane's property market and what it means for investors.",
    content: `<div class="prose max-w-none">
      <p>The Brisbane property market continues to show strong fundamentals heading into 2024, with several key factors driving sustained growth and opportunity across the city.</p>

      <h3>Olympic Infrastructure Boost</h3>
      <p>The 2032 Olympic Games preparations are already transforming Brisbane's property landscape. Major infrastructure projects including the Cross River Rail, Olympic venues, and transport upgrades are creating significant value uplift in surrounding suburbs.</p>

      <h3>Interstate Migration Patterns</h3>
      <p>Brisbane continues to attract interstate migrants, particularly from Sydney and Melbourne, drawn by relative affordability and lifestyle factors. This demographic shift is supporting both owner-occupier and rental demand.</p>

      <h3>Market Fundamentals</h3>
      <p>With median house prices around $785,000, Brisbane offers compelling value compared to other capital cities while maintaining strong rental yields averaging 4.1% across quality investment areas.</p>

      <h3>Investment Opportunities</h3>
      <p>Growth corridors including Springfield, Ripley, and emerging inner-city developments present attractive investment propositions for both first-time and experienced investors.</p>
    </div>`,
    date: "2024-03-15",
    author: "Sarah Mitchell",
    category: "Market Analysis",
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  },
  {
    id: "2",
    title: "Top 10 Investment Suburbs in Brisbane",
    slug: "top-10-investment-suburbs-brisbane",
    excerpt: "Our expert analysis of Brisbane's most promising suburbs for property investment.",
    content: `<div class="prose max-w-none">
      <p>Investment opportunities in Brisbane are abundant, but knowing where to look is key to maximizing your returns. Here are our top 10 suburbs for property investment in 2024:</p>

      <h3>1. New Farm</h3>
      <p>Excellent rental yields and strong capital growth potential with proximity to CBD and lifestyle amenities.</p>

      <h3>2. Woolloongabba</h3>
      <p>Olympic precinct development and major infrastructure investment driving long-term growth.</p>

      <h3>3. Fortitude Valley</h3>
      <p>Urban renewal and apartment developments creating diverse investment opportunities.</p>

      <h3>4. Springfield Central</h3>
      <p>Master-planned community with strong population growth and infrastructure development.</p>

      <h3>5. Ripley</h3>
      <p>Emerging growth corridor with excellent value propositions and development potential.</p>

      <p>Each suburb offers unique advantages depending on your investment strategy, risk tolerance, and return expectations.</p>
    </div>`,
    date: "2024-03-10",
    author: "David Chen",
    category: "Investment Tips",
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  },
  {
    id: "3",
    title: "Property Styling Tips for Maximum Returns",
    slug: "property-styling-tips-maximum-returns",
    excerpt: "Simple styling techniques that can significantly increase your property's appeal and value.",
    content: `<div class="prose max-w-none">
      <p>When it comes to selling or renting your property, first impressions matter. Professional styling can increase your property's appeal and potentially add thousands to the final sale price.</p>

      <h3>Key Styling Principles</h3>
      <ul>
        <li>Neutralize color schemes to appeal to broader audiences</li>
        <li>Maximize natural light through strategic window treatments</li>
        <li>Create a sense of space with minimal, purposeful furniture</li>
        <li>Add fresh flowers and plants for warmth and vitality</li>
      </ul>

      <h3>Budget-Friendly Updates</h3>
      <p>You don't need to spend a fortune to make a significant impact. Focus on:</p>
      <ul>
        <li>Fresh paint in contemporary neutral tones</li>
        <li>Updated hardware on cabinets and doors</li>
        <li>Professional cleaning and decluttering</li>
        <li>Strategic lighting improvements</li>
      </ul>

      <h3>ROI Considerations</h3>
      <p>Professional styling typically costs 1-3% of your property's value but can increase sale prices by 5-15%, making it one of the most cost-effective improvements you can make.</p>
    </div>`,
    date: "2024-03-05",
    author: "Emma Thompson",
    category: "Property Tips",
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  },
  {
    id: "4",
    title: "Understanding Brisbane's Rental Market Dynamics",
    slug: "brisbane-rental-market-dynamics",
    excerpt: "A comprehensive guide to Brisbane's rental market trends and what they mean for investors and tenants.",
    content: `<div class="prose max-w-none">
      <p>Brisbane's rental market has experienced significant evolution in recent years, driven by population growth, economic diversification, and changing lifestyle preferences.</p>

      <h3>Current Market Conditions</h3>
      <p>Vacancy rates remain below historical averages, creating a landlord-favorable market with steady rental growth across most suburbs. Quality properties in well-located areas are experiencing particularly strong demand.</p>

      <h3>Tenant Preferences</h3>
      <p>Modern tenants prioritize:</p>
      <ul>
        <li>Proximity to transport infrastructure</li>
        <li>Access to amenities and lifestyle precincts</li>
        <li>Energy-efficient features and modern appliances</li>
        <li>Flexible lease terms and property management responsiveness</li>
      </ul>

      <h3>Investment Implications</h3>
      <p>For investors, the current market presents opportunities for both immediate cash flow and long-term capital growth, particularly in suburbs benefiting from infrastructure investment and demographic growth.</p>
    </div>`,
    date: "2024-02-28",
    author: "Michael Rodriguez",
    category: "Rental Market",
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  },
  {
    id: "5",
    title: "First-Time Buyer's Guide to Brisbane Property",
    slug: "first-time-buyers-guide-brisbane",
    excerpt: "Essential tips and strategies for navigating your first property purchase in Brisbane.",
    content: `<div class="prose max-w-none">
      <p>Entering Brisbane's property market as a first-time buyer can feel overwhelming, but with the right strategy and preparation, it's an achievable and rewarding goal.</p>

      <h3>Financial Preparation</h3>
      <p>Before you start house hunting:</p>
      <ul>
        <li>Calculate your borrowing capacity with a mortgage broker</li>
        <li>Save for a minimum 10% deposit plus costs</li>
        <li>Research first home buyer grants and incentives</li>
        <li>Consider lenders mortgage insurance implications</li>
      </ul>

      <h3>Location Strategy</h3>
      <p>Focus on areas that offer:</p>
      <ul>
        <li>Good transport links to employment centers</li>
        <li>Established amenities and services</li>
        <li>Evidence of ongoing development and investment</li>
        <li>Potential for future capital growth</li>
      </ul>

      <h3>The Buying Process</h3>
      <p>Work with experienced professionals including a buyer's agent, building inspector, and conveyancer to navigate the purchase process confidently and avoid costly mistakes.</p>
    </div>`,
    date: "2024-02-20",
    author: "Lisa Chang",
    category: "Buying Guide",
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  },
  {
    id: "6", 
    title: "Olympic Games Impact on Brisbane Property Values",
    slug: "olympic-games-brisbane-property-impact",
    excerpt: "How the 2032 Olympic Games are already transforming Brisbane's property market and creating investment opportunities.",
    content: `<div class="prose max-w-none">
      <p>The 2032 Olympic Games announcement has been a catalyst for significant infrastructure investment and urban development across Brisbane, creating ripple effects throughout the property market.</p>

      <h3>Infrastructure Investment</h3>
      <p>Major projects already underway or planned include:</p>
      <ul>
        <li>Cross River Rail connecting northern and southern suburbs</li>
        <li>Olympic venue construction and upgrades</li>
        <li>Transport corridor improvements</li>
        <li>Urban renewal projects in key precincts</li>
      </ul>

      <h3>Suburb-Specific Impacts</h3>
      <p>Different areas are experiencing varying levels of Olympic-related benefit:</p>
      <ul>
        <li><strong>Woolloongabba:</strong> Major venue hub with significant development</li>
        <li><strong>South Bank:</strong> Enhanced connectivity and amenity improvements</li>
        <li><strong>Hamilton:</strong> Cruise terminal and waterfront development</li>
        <li><strong>Boondall:</strong> Entertainment precinct expansion</li>
      </ul>

      <h3>Investment Timeline</h3>
      <p>While the games are still years away, property values in key areas are already reflecting anticipated improvements. Strategic investors are positioning now to benefit from both the development phase and post-games legacy benefits.</p>
    </div>`,
    date: "2024-02-15",
    author: "James Patterson",
    category: "Market Analysis", 
    image: "/placeholder.svg?height=300&width=400",
    published: true,
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

export function createPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
  };
  blogPosts.push(newPost);
  return newPost;
}

export function updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index === -1) return null;

  blogPosts[index] = { ...blogPosts[index], ...updates };
  return blogPosts[index];
}

export function deletePost(id: string): boolean {
  const index = blogPosts.findIndex(post => post.id === id);
  if (index === -1) return false;

  blogPosts.splice(index, 1);
  return true;
}