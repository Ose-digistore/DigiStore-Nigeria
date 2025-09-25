export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  modules: string;
  duration: string;
  downloadSize: string;
  format: string;
}

export const products: Product[] = [
  // Existing products (unchanged)
  {
    id: "1",
    name: "WhatsApp Marketing Mastery",
    description: "Complete guide to WhatsApp business automation and lead generation strategies",
    price: 5000,
    category: "Marketing",
    modules: "12",
    duration: "4 hours",
    downloadSize: "250MB",
    format: "PDF + Videos"
  },
  {
    id: "2",
    name: "Forex Trading Signals Bot",
    description: "Automated trading signals with 85% accuracy rate for major currency pairs",
    price: 5000,
    category: "Trading",
    modules: "8",
    duration: "2 hours",
    downloadSize: "150MB",
    format: "Software + Guide"
  },
  {
    id: "3",
    name: "Instagram Monetization Blueprint",
    description: "Step-by-step system to earn $1000+ monthly from Instagram content creation",
    price: 5000,
    category: "Social Media",
    modules: "15",
    duration: "6 hours",
    downloadSize: "400MB",
    format: "Video Course"
  },
  {
    id: "4",
    name: "Cryptocurrency Investment Guide",
    description: "Complete crypto portfolio management and DeFi yield farming strategies",
    price: 5000,
    category: "Cryptocurrency",
    modules: "10",
    duration: "3 hours",
    downloadSize: "200MB",
    format: "PDF + Tools"
  },
  {
    id: "5",
    name: "E-commerce Dropshipping Toolkit",
    description: "Ready-to-use Shopify store templates and winning product research methods",
    price: 5000,
    category: "E-commerce",
    modules: "20",
    duration: "8 hours",
    downloadSize: "500MB",
    format: "Templates + Videos"
  },
  {
    id: "6",
    name: "YouTube Automation System",
    description: "Faceless YouTube channel creation with AI tools for passive income generation",
    price: 5000,
    category: "YouTube",
    modules: "14",
    duration: "5 hours",
    downloadSize: "350MB",
    format: "Course + Software"
  },
  {
    id: "7",
    name: "Affiliate Marketing Funnel",
    description: "High-converting sales funnels and email sequences for affiliate promotions",
    price: 5000,
    category: "Affiliate Marketing",
    modules: "18",
    duration: "7 hours",
    downloadSize: "300MB",
    format: "Templates + Training"
  },
  {
    id: "8",
    name: "Binary Options Strategy",
    description: "Proven binary options trading system with risk management protocols",
    price: 5000,
    category: "Trading",
    modules: "6",
    duration: "2 hours",
    downloadSize: "100MB",
    format: "PDF + Indicators"
  },
  {
    id: "9",
    name: "TikTok Viral Content Creator",
    description: "Trending content templates and growth hacks for TikTok monetization",
    price: 5000,
    category: "Social Media",
    modules: "12",
    duration: "4 hours",
    downloadSize: "280MB",
    format: "Video + Templates"
  },
  {
    id: "10",
    name: "Real Estate Investment Calculator",
    description: "Property analysis tools and investment strategies for Nigerian real estate market",
    price: 5000,
    category: "Real Estate",
    modules: "9",
    duration: "3 hours",
    downloadSize: "180MB",
    format: "Excel + Guide"
  },
  {
    id: "11",
    name: "Digital Product Creation Kit",
    description: "Complete system for creating and selling digital products online profitably",
    price: 5000,
    category: "Business",
    modules: "16",
    duration: "6 hours",
    downloadSize: "320MB",
    format: "Course + Tools"
  },
  {
    id: "12",
    name: "Facebook Ads Mastery Course",
    description: "Advanced Facebook advertising strategies for maximum ROI and lead generation",
    price: 5000,
    category: "Marketing",
    modules: "22",
    duration: "9 hours",
    downloadSize: "450MB",
    format: "Video Course"
  },
  {
    id: "13",
    name: "Freelancing Success Blueprint",
    description: "Complete guide to building a 6-figure freelancing business from scratch",
    price: 5000,
    category: "Freelancing",
    modules: "13",
    duration: "5 hours",
    downloadSize: "250MB",
    format: "PDF + Videos"
  },
  {
    id: "14",
    name: "Stock Market Analysis Tools",
    description: "Professional stock screening and technical analysis software for Nigerian market",
    price: 5000,
    category: "Trading",
    modules: "11",
    duration: "4 hours",
    downloadSize: "200MB",
    format: "Software + Training"
  },
  {
    id: "15",
    name: "Online Course Creation System",
    description: "Step-by-step system to create, market and sell profitable online courses",
    price: 5000,
    category: "Education",
    modules: "19",
    duration: "8 hours",
    downloadSize: "400MB",
    format: "Complete System"
  },
  {
    id: "16",
    name: "Email Marketing Automation",
    description: "Advanced email sequences and automation workflows for maximum conversions",
    price: 5000,
    category: "Marketing",
    modules: "17",
    duration: "7 hours",
    downloadSize: "300MB",
    format: "Templates + Course"
  },

  // NEW PRODUCTS ADDED
  {
    id: "17",
    name: "Amazon FBA Nigeria Guide",
    description: "Complete guide to selling on Amazon from Nigeria with product sourcing strategies",
    price: 5000,
    category: "E-commerce",
    modules: "14",
    duration: "5 hours",
    downloadSize: "280MB",
    format: "Video + PDF"
  },
  {
    id: "18",
    name: "Cryptocurrency Mining Setup",
    description: "Step-by-step crypto mining setup guide optimized for Nigerian electricity costs",
    price: 5000,
    category: "Cryptocurrency",
    modules: "8",
    duration: "3 hours",
    downloadSize: "150MB",
    format: "Guide + Software"
  },
  {
    id: "19",
    name: "LinkedIn Lead Generation Bot",
    description: "Automated LinkedIn outreach system for B2B lead generation and sales",
    price: 5000,
    category: "Marketing",
    modules: "10",
    duration: "3 hours",
    downloadSize: "200MB",
    format: "Bot + Training"
  },
  {
    id: "20",
    name: "Telegram Channel Monetization",
    description: "Build and monetize Telegram channels with subscriber growth strategies",
    price: 5000,
    category: "Social Media",
    modules: "12",
    duration: "4 hours",
    downloadSize: "220MB",
    format: "Course + Tools"
  },
  {
    id: "21",
    name: "NFT Creation & Trading Guide",
    description: "Complete NFT creation, minting, and trading strategies for maximum profits",
    price: 5000,
    category: "Cryptocurrency",
    modules: "15",
    duration: "6 hours",
    downloadSize: "350MB",
    format: "Video Course"
  },
  {
    id: "22",
    name: "Google Ads Profit System",
    description: "High-ROI Google Ads campaigns with keyword research and optimization tools",
    price: 5000,
    category: "Marketing",
    modules: "18",
    duration: "7 hours",
    downloadSize: "380MB",
    format: "Complete System"
  },
  {
    id: "23",
    name: "Shopify Store Builder Kit",
    description: "Ready-made Shopify themes and conversion-optimized store setup templates",
    price: 5000,
    category: "E-commerce",
    modules: "16",
    duration: "6 hours",
    downloadSize: "450MB",
    format: "Themes + Training"
  },
  {
    id: "24",
    name: "Content Writing Mastery",
    description: "Professional copywriting techniques for high-converting sales pages and ads",
    price: 5000,
    category: "Writing",
    modules: "20",
    duration: "8 hours",
    downloadSize: "300MB",
    format: "Course + Templates"
  },
  {
    id: "25",
    name: "Podcast Monetization Blueprint",
    description: "Complete system to start, grow and monetize podcasts in Nigerian market",
    price: 5000,
    category: "Media",
    modules: "13",
    duration: "5 hours",
    downloadSize: "250MB",
    format: "Audio + PDF"
  },
  {
    id: "26",
    name: "Mobile App Development Kit",
    description: "No-code mobile app creation tools and templates for business applications",
    price: 5000,
    category: "Technology",
    modules: "22",
    duration: "9 hours",
    downloadSize: "500MB",
    format: "Software + Course"
  },
  {
    id: "27",
    name: "Forex Scalping Robot",
    description: "Automated forex scalping EA with backtested strategies for MT4/MT5",
    price: 5000,
    category: "Trading",
    modules: "7",
    duration: "2 hours",
    downloadSize: "120MB",
    format: "EA + Manual"
  },
  {
    id: "28",
    name: "Pinterest Marketing System",
    description: "Pinterest traffic generation and affiliate marketing strategies for passive income",
    price: 5000,
    category: "Social Media",
    modules: "11",
    duration: "4 hours",
    downloadSize: "200MB",
    format: "Video + Tools"
  },
  {
    id: "29",
    name: "Virtual Assistant Business",
    description: "Complete guide to starting and scaling a virtual assistant service business",
    price: 5000,
    category: "Business",
    modules: "17",
    duration: "7 hours",
    downloadSize: "320MB",
    format: "Business Kit"
  },
  {
    id: "30",
    name: "SEO Ranking Toolkit",
    description: "Advanced SEO tools and strategies to rank #1 on Google for any keyword",
    price: 5000,
    category: "SEO",
    modules: "19",
    duration: "8 hours",
    downloadSize: "400MB",
    format: "Tools + Training"
  },
  {
    id: "31",
    name: "Betting Prediction System",
    description: "Statistical sports betting analysis system with proven winning strategies",
    price: 5000,
    category: "Sports Betting",
    modules: "9",
    duration: "3 hours",
    downloadSize: "180MB",
    format: "Software + Guide"
  },
  {
    id: "32",
    name: "Graphic Design Business Kit",
    description: "Complete graphic design templates and client acquisition system for designers",
    price: 5000,
    category: "Design",
    modules: "21",
    duration: "8 hours",
    downloadSize: "600MB",
    format: "Templates + Course"
  },
  {
    id: "33",
    name: "Cryptocurrency Arbitrage Bot",
    description: "Automated crypto arbitrage trading bot for risk-free profit opportunities",
    price: 5000,
    category: "Cryptocurrency",
    modules: "6",
    duration: "2 hours",
    downloadSize: "100MB",
    format: "Bot + Setup Guide"
  },
  {
    id: "34",
    name: "Online Tutoring Business",
    description: "Complete system to start and scale an online tutoring business in Nigeria",
    price: 5000,
    category: "Education",
    modules: "14",
    duration: "5 hours",
    downloadSize: "280MB",
    format: "Business System"
  },
  {
    id: "35",
    name: "Twitter Growth Automation",
    description: "Automated Twitter growth strategies and engagement tools for viral content",
    price: 5000,
    category: "Social Media",
    modules: "12",
    duration: "4 hours",
    downloadSize: "220MB",
    format: "Tools + Strategy"
  },
  {
    id: "36",
    name: "Web Development Course",
    description: "Complete web development bootcamp from HTML to full-stack applications",
    price: 5000,
    category: "Technology",
    modules: "30",
    duration: "15 hours",
    downloadSize: "800MB",
    format: "Video Course"
  },
  {
    id: "37",
    name: "Import/Export Business Guide",
    description: "Complete guide to starting profitable import/export business in Nigeria",
    price: 5000,
    category: "Business",
    modules: "16",
    duration: "6 hours",
    downloadSize: "350MB",
    format: "Business Manual"
  },
  {
    id: "38",
    name: "AI Content Creation Tools",
    description: "Advanced AI tools and prompts for automated content creation across platforms",
    price: 5000,
    category: "AI Tools",
    modules: "13",
    duration: "5 hours",
    downloadSize: "250MB",
    format: "Software + Training"
  },
  {
    id: "39",
    name: "Dropservicing Business Model",
    description: "Complete dropservicing system to sell services without doing the work yourself",
    price: 5000,
    category: "Business",
    modules: "15",
    duration: "6 hours",
    downloadSize: "300MB",
    format: "System + Templates"
  },
  {
    id: "40",
    name: "Real Estate Crowdfunding",
    description: "Guide to real estate crowdfunding and property investment platforms in Nigeria",
    price: 5000,
    category: "Real Estate",
    modules: "10",
    duration: "4 hours",
    downloadSize: "200MB",
    format: "Investment Guide"
  },
  {
    id: "41",
    name: "Etsy Shop Success System",
    description: "Complete Etsy shop setup and product optimization for international sales",
    price: 5000,
    category: "E-commerce",
    modules: "18",
    duration: "7 hours",
    downloadSize: "400MB",
    format: "Shop Kit + Course"
  },
  {
    id: "42",
    name: "Cryptocurrency DeFi Strategies",
    description: "Advanced DeFi yield farming and liquidity mining strategies for maximum returns",
    price: 5000,
    category: "Cryptocurrency",
    modules: "12",
    duration: "5 hours",
    downloadSize: "280MB",
    format: "Strategy Guide"
  },
  {
    id: "43",
    name: "Video Editing Business Kit",
    description: "Professional video editing templates and client acquisition system",
    price: 5000,
    category: "Media",
    modules: "19",
    duration: "8 hours",
    downloadSize: "650MB",
    format: "Templates + Training"
  },
  {
    id: "44",
    name: "WhatsApp Business API Bot",
    description: "Advanced WhatsApp Business API automation for customer service and sales",
    price: 5000,
    category: "Technology",
    modules: "11",
    duration: "4 hours",
    downloadSize: "200MB",
    format: "Bot + Setup"
  },
  {
    id: "45",
    name: "Influencer Marketing Agency",
    description: "Complete system to start and scale an influencer marketing agency business",
    price: 5000,
    category: "Marketing",
    modules: "20",
    duration: "8 hours",
    downloadSize: "380MB",
    format: "Agency Kit"
  },
  {
    id: "46",
    name: "Stock Photography Business",
    description: "Complete guide to earning from stock photography with optimization techniques",
    price: 5000,
    category: "Photography",
    modules: "14",
    duration: "5 hours",
    downloadSize: "300MB",
    format: "Photo + Guide"
  },
  {
    id: "47",
    name: "Blockchain Development Course",
    description: "Learn blockchain development and smart contract creation from scratch",
    price: 5000,
    category: "Technology",
    modules: "25",
    duration: "12 hours",
    downloadSize: "700MB",
    format: "Code + Videos"
  },
  {
    id: "48",
    name: "Digital Marketing Agency Kit",
    description: "Complete digital marketing agency setup with client templates and systems",
    price: 5000,
    category: "Marketing",
    modules: "24",
    duration: "10 hours",
    downloadSize: "500MB",
    format: "Agency System"
  },
  {
    id: "49",
    name: "Forex Copy Trading System",
    description: "Professional forex copy trading setup with signal providers and risk management",
    price: 5000,
    category: "Trading",
    modules: "8",
    duration: "3 hours",
    downloadSize: "150MB",
    format: "System + Guide"
  },
  {
    id: "50",
    name: "Online Coaching Business",
    description: "Complete system to build and scale a profitable online coaching business",
    price: 5000,
    category: "Business",
    modules: "22",
    duration: "9 hours",
    downloadSize: "450MB",
    format: "coaching System"
  },

  // FOREX COURSES ADDED AS REQUESTED
  {
    id: "51",
    name: "Forex Course: Top Down Analysis with Demand & Supply",
    description: "Master forex trading using professional Top Down Analysis combined with Demand and Supply zones. Learn to identify high-probability trading setups like institutional traders with comprehensive live chart examples and step-by-step guidance from basics to advanced mastery.",
    price: 5000,
    category: "Forex Trading",
    modules: "25",
    duration: "15 hours",
    downloadSize: "3.2 GB",
    format: "Video + PDF + Live Charts + Indicators"
  },
  {
    id: "52",
    name: "Forex Course: Master Smart Money Concept (SMC)",
    description: "Learn to trade like institutional investors using Smart Money Concepts. Understand market manipulation, liquidity grabs, order blocks, fair value gaps, and how big money moves the forex market. Complete education from beginner to expert level with live chart analysis.",
    price: 5000,
    category: "Forex Trading",
    modules: "28",
    duration: "18 hours",
    downloadSize: "4.1 GB",
    format: "Video + PDF + Live Charts + Templates"
  },
  {
    id: "53",
    name: "Trade the Forex Market Using ICT Advanced Trading Strategies",
    description: "Master the Inner Circle Trader (ICT) methodology - the most comprehensive and advanced forex trading strategy course. Learn institutional concepts, market maker models, precision trading, optimal trade entries, silver bullet strategy, power of three, judas swing, and all ICT concepts from absolute basics to complete mastery with extensive live chart analysis and real trading examples.",
    price: 5000,
    category: "Forex Trading",
    modules: "35",
    duration: "25 hours",
    downloadSize: "5.8 GB",
    format: "Video + PDF + Live Charts + Templates + Indicators + Trading Journal"
  }
];