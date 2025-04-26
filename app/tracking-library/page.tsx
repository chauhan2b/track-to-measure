"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for tracking event guides
const trackingEventCategories = [
  {
    id: "ecommerce",
    name: "E-commerce",
    guides: [
      { id: "add-to-cart", name: "Add to Cart", platform: "GA4" },
      { id: "purchase", name: "Purchase", platform: "GA4" },
      { id: "view-item", name: "View Item", platform: "GA4" },
      { id: "begin-checkout", name: "Begin Checkout", platform: "GA4" },
      { id: "add-payment-info", name: "Add Payment Info", platform: "GA4" },
    ],
  },
  {
    id: "engagement",
    name: "User Engagement",
    guides: [
      { id: "page-view", name: "Page View", platform: "GTM" },
      { id: "scroll-tracking", name: "Scroll Tracking", platform: "GTM" },
      { id: "video-play", name: "Video Play", platform: "GTM" },
      { id: "outbound-click", name: "Outbound Link Click", platform: "GTM" },
      { id: "file-download", name: "File Download", platform: "GTM" },
    ],
  },
  {
    id: "forms",
    name: "Form Interactions",
    guides: [
      { id: "form-submit", name: "Form Submit", platform: "Meta Pixel" },
      { id: "form-start", name: "Form Start", platform: "Meta Pixel" },
      { id: "form-field-complete", name: "Form Field Complete", platform: "Meta Pixel" },
      { id: "form-error", name: "Form Error", platform: "Meta Pixel" },
    ],
  },
  {
    id: "social",
    name: "Social Media",
    guides: [
      { id: "social-share", name: "Social Share", platform: "Multiple" },
      { id: "tweet-intent", name: "Tweet Intent", platform: "Twitter Pixel" },
      { id: "linkedin-share", name: "LinkedIn Share", platform: "LinkedIn Insight" },
      { id: "facebook-share", name: "Facebook Share", platform: "Meta Pixel" },
    ],
  },
];

interface Guide {
  id: string;
  name: string;
  platform: string;
}

export default function TrackingLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ecommerce");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  const filteredGuides = searchTerm
    ? trackingEventCategories.flatMap((category) =>
        category.guides.filter(
          (guide) =>
            guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.platform.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : trackingEventCategories.find((cat) => cat.id === selectedCategory)?.guides || [];

  const handleCopyCode = () => {
    // In a real implementation, this would copy actual code snippets
    navigator.clipboard.writeText(`// Sample ${selectedGuide?.name} tracking code for ${selectedGuide?.platform}
function track${selectedGuide?.name.replace(/\s+/g, "")}(data) {
  console.log("Tracking ${selectedGuide?.name}", data);
  // Add your tracking code here
}`);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Tracking Event Library</h1>
        <p className="text-lg text-muted-foreground">
          Browse our comprehensive library of tracking event listener guides for different marketing platforms.
        </p>
        
        <div className="w-full max-w-md">
          <Input
            type="search"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {!searchTerm && (
          <Tabs defaultValue="ecommerce" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              {trackingEventCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedGuide(guide)}>
              <CardHeader>
                <CardTitle>{guide.name}</CardTitle>
                <CardDescription>Platform: {guide.platform}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Implementation guide for tracking {guide.name.toLowerCase()} events on websites.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGuide(guide);
                }}>
                  View Guide
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedGuide && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>{selectedGuide.name}</CardTitle>
                <CardDescription>Implementation Guide for {selectedGuide.platform}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This guide explains how to implement {selectedGuide.name.toLowerCase()} event tracking for {selectedGuide.platform}.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">When to Trigger</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Trigger this event when a user {selectedGuide.name.toLowerCase().includes("form") 
                      ? "interacts with a form" 
                      : selectedGuide.name.toLowerCase().includes("purchase") 
                        ? "completes a purchase" 
                        : "performs the specific action"}.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Code Implementation</h3>
                  <div className="mt-1 relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                      <code>
                        {`// ${selectedGuide.name} Event for ${selectedGuide.platform}
function track${selectedGuide.name.replace(/\s+/g, "")}(data) {
  ${selectedGuide.platform === "GA4" 
    ? `gtag("event", "${selectedGuide.id}", {
    currency: "USD",
    value: data.value,
    items: data.items
  });` 
    : selectedGuide.platform === "Meta Pixel" 
      ? `fbq('track', '${selectedGuide.id}', {
    value: data.value,
    currency: 'USD',
  });`
      : `// Custom implementation for ${selectedGuide.platform}
console.log("Tracking ${selectedGuide.id}", data);`}
}`}
                      </code>
                    </pre>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={handleCopyCode}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Parameters</h3>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-muted-foreground">
                    <li><span className="font-mono text-primary">data.value</span> - The monetary value associated with the event (if applicable)</li>
                    <li><span className="font-mono text-primary">data.items</span> - Array of items (for e-commerce events)</li>
                    <li><span className="font-mono text-primary">data.currency</span> - Transaction currency (default: USD)</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedGuide(null)}>Close</Button>
                <Button onClick={handleCopyCode}>Copy Code</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {filteredGuides.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No guides found</h3>
            <p className="text-muted-foreground">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
}