import { NextResponse } from "next/server";

// Type definitions for our tag data
type TagStatus = "found" | "not_found" | "warning";

interface Tag {
  type: string;
  name: string;
  status: TagStatus;
  id: string | null;
  warnings: string[];
  icon: string;
}

interface ScanResult {
  url: string;
  scanDate: string;
  cms: string | null;
  tags: Tag[];
  recommendations: string[];
}

// This function detects tracking tags from HTML content
function detectTags(html: string, url: string): ScanResult {
  const tags: Tag[] = [];
  const recommendations: string[] = [];
  let cms: string | null = null;
  
  // Detect CMS
  if (html.includes("wp-content")) {
    cms = "WordPress";
  } else if (html.includes("Shopify.theme")) {
    cms = "Shopify";
  } else if (html.includes("Drupal.settings")) {
    cms = "Drupal";
  } else {
    cms = null;
  }

  // Google Tag Manager detection
  const gtmRegex = /GTM-[A-Z0-9]{4,7}/i;
  const gtmMatch = html.match(gtmRegex);
  tags.push({
    type: "gtm",
    name: "Google Tag Manager",
    status: gtmMatch ? "found" : "not_found",
    id: gtmMatch ? gtmMatch[0] : null,
    warnings: [],
    icon: "/google-tag-manager.svg",
  });
  
  // Google Analytics 4 detection
  const ga4Regex = /G-[A-Z0-9]{10}/i;
  const ga4Match = html.match(ga4Regex);
  const isGa4Configured = html.includes("gtag('config'") || html.includes('gtag("config"');
  let ga4Warnings: string[] = [];
  
  if (ga4Match && !isGa4Configured) {
    ga4Warnings.push("Incomplete configuration");
  }
  
  tags.push({
    type: "ga4",
    name: "Google Analytics 4",
    status: ga4Match ? "found" : "not_found",
    id: ga4Match ? ga4Match[0] : null,
    warnings: ga4Warnings,
    icon: "/google-analytics.svg",
  });
  
  // Meta Pixel detection
  const metaRegex = /fbq\('init', ?'(\d{15,16})'\)/i;
  const metaMatch = html.match(metaRegex);
  tags.push({
    type: "meta",
    name: "Meta Pixel",
    status: metaMatch || html.includes("connect.facebook.net/en_US/fbevents.js") ? "found" : "not_found",
    id: metaMatch ? metaMatch[1] : null,
    warnings: [],
    icon: "/meta-pixel.svg",
  });
  
  // Google Ads detection
  const adsRegex = /AW-[0-9]{9,10}/i;
  const adsMatch = html.match(adsRegex);
  tags.push({
    type: "ads",
    name: "Google Ads",
    status: adsMatch ? "found" : "not_found",
    id: adsMatch ? adsMatch[0] : null,
    warnings: [],
    icon: "/google-ads.svg",
  });
  
  // Microsoft Advertising detection
  const msRegex = /bat.js/i;
  const msMatch = html.match(msRegex);
  tags.push({
    type: "microsoft",
    name: "Microsoft Advertising",
    status: msMatch ? "found" : "not_found",
    id: null, // Microsoft Advertising doesn't typically expose IDs in the HTML
    warnings: [],
    icon: "/microsoft.svg",
  });
  
  // LinkedIn Insight detection
  const liRegex = /_linkedin_partner_id = "(\d+)"/i;
  const liMatch = html.match(liRegex);
  tags.push({
    type: "linkedin",
    name: "LinkedIn Insight",
    status: liMatch || html.includes("snap.licdn.com") ? "found" : "not_found",
    id: liMatch ? liMatch[1] : null,
    warnings: [],
    icon: "/linkedin.svg",
  });
  
  // Twitter/X Pixel detection
  const twitterRegex = /twq\('init', ?'([a-z0-9]{5,})'\)/i;
  const twitterMatch = html.match(twitterRegex);
  tags.push({
    type: "twitter",
    name: "Twitter/X Pixel",
    status: twitterMatch || html.includes("static.ads-twitter.com") ? "found" : "not_found",
    id: twitterMatch ? twitterMatch[1] : null,
    warnings: [],
    icon: "/twitter.svg",
  });
  
  // TikTok Pixel detection
  const tiktokRegex = /'i': ?'([A-Z0-9]{20})'/i;
  const tiktokMatch = html.match(tiktokRegex);
  tags.push({
    type: "tiktok",
    name: "TikTok Pixel",
    status: tiktokMatch || html.includes("analytics.tiktok.com") ? "found" : "not_found",
    id: tiktokMatch ? tiktokMatch[1] : null,
    warnings: [],
    icon: "/tiktok.svg",
  });
  
  // Generate recommendations based on missing tags
  const missingTags = tags.filter(tag => tag.status === "not_found");
  if (missingTags.length > 0) {
    missingTags.forEach(tag => {
      recommendations.push(`Consider implementing ${tag.name} for better tracking capabilities`);
    });
  }
  
  // Add recommendations based on warnings
  tags.forEach(tag => {
    if (tag.warnings.length > 0) {
      recommendations.push(`Fix ${tag.name} configuration: ${tag.warnings.join(", ")}`);
    }
  });
  
  return {
    url,
    scanDate: new Date().toISOString(),
    cms,
    tags,
    recommendations,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }
    
    // Fetch the website content
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'TagSentry-TagScanner/1.0'
        }
      });
      
      if (!response.ok) {
        return NextResponse.json(
          { error: `Failed to fetch website: ${response.statusText}` },
          { status: 500 }
        );
      }
      
      const html = await response.text();
      
      // Detect tags from the HTML content
      const result = detectTags(html, url);
      
      return NextResponse.json(result);
    } catch (error) {
      console.error("Error scanning website:", error);
      return NextResponse.json(
        { error: "Failed to scan website" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}