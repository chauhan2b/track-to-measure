"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Event listener categories and their guides
const trackingCategories = [
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    guides: [
      {
        id: "ga4-pageview",
        name: "Page View",
        description: "Track when a user views a page",
        code: `// Google Analytics 4 Page View
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href,
  page_path: window.location.pathname
});`,
      },
      {
        id: "ga4-click-event",
        name: "Click Event",
        description: "Track when a user clicks on an element",
        code: `// Google Analytics 4 Click Event
document.querySelector('.my-button').addEventListener('click', function() {
  gtag('event', 'button_click', {
    element_id: this.id,
    element_text: this.innerText,
    element_url: this.href || ''
  });
});`,
      },
      {
        id: "ga4-form-submit",
        name: "Form Submission",
        description: "Track when a user submits a form",
        code: `// Google Analytics 4 Form Submission
document.querySelector('form').addEventListener('submit', function() {
  gtag('event', 'form_submit', {
    form_id: this.id,
    form_name: this.name || 'unnamed_form',
    form_destination: this.action
  });
});`,
      },
      {
        id: "ga4-ecommerce",
        name: "Ecommerce Purchase",
        description: "Track when a user completes a purchase",
        code: `// Google Analytics 4 Purchase Event
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 59.99,
  currency: 'USD',
  tax: 4.90,
  shipping: 5.99,
  items: [
    {
      item_id: 'SKU_12345',
      item_name: 'Stan Smith Shoes',
      item_category: 'Footwear',
      price: 59.99,
      quantity: 1
    }
  ]
});`,
      },
    ],
  },
  {
    id: "facebook-pixel",
    name: "Meta Pixel",
    guides: [
      {
        id: "meta-pageview",
        name: "Page View",
        description: "Track when a user views a page",
        code: `// Meta Pixel Page View
fbq('track', 'PageView');`,
      },
      {
        id: "meta-lead",
        name: "Lead",
        description: "Track when a user becomes a lead",
        code: `// Meta Pixel Lead Event
fbq('track', 'Lead', {
  content_name: 'Newsletter Signup',
  content_category: 'Signup Form'
});`,
      },
      {
        id: "meta-registration",
        name: "Registration",
        description: "Track when a user completes registration",
        code: `// Meta Pixel Registration Event
fbq('track', 'CompleteRegistration', {
  content_name: 'User Registration',
  status: 'success'
});`,
      },
      {
        id: "meta-purchase",
        name: "Purchase",
        description: "Track when a user completes a purchase",
        code: `// Meta Pixel Purchase Event
fbq('track', 'Purchase', {
  value: 59.99,
  currency: 'USD',
  content_ids: ['SKU_12345'],
  content_type: 'product',
  content_name: 'Stan Smith Shoes',
  content_category: 'Footwear'
});`,
      },
    ],
  },
  {
    id: "google-tag-manager",
    name: "Google Tag Manager",
    guides: [
      {
        id: "gtm-dataLayer-push",
        name: "DataLayer Push",
        description: "Basic DataLayer push implementation",
        code: `// Google Tag Manager DataLayer Push
dataLayer.push({
  'event': 'custom_event',
  'event_category': 'User Interaction',
  'event_action': 'Button Click',
  'event_label': 'Sign Up Button'
});`,
      },
      {
        id: "gtm-click-listener",
        name: "Click Listener",
        description: "Track clicks using GTM",
        code: `// Google Tag Manager Click Listener
// Add this code to your page
document.querySelectorAll('.tracked-button').forEach(function(button) {
  button.addEventListener('click', function() {
    dataLayer.push({
      'event': 'button_click',
      'button_id': this.id,
      'button_text': this.innerText,
      'button_class': this.className
    });
  });
});`,
      },
      {
        id: "gtm-form-submit",
        name: "Form Submission",
        description: "Track form submissions using GTM",
        code: `// Google Tag Manager Form Submission
// Add this code to your page
document.querySelectorAll('form').forEach(function(form) {
  form.addEventListener('submit', function() {
    dataLayer.push({
      'event': 'form_submit',
      'form_id': this.id,
      'form_name': this.getAttribute('name') || 'unnamed_form',
      'form_destination': this.action
    });
  });
});`,
      },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn Insight",
    guides: [
      {
        id: "linkedin-pageview",
        name: "Page View",
        description: "Track when a user views a page",
        code: `// LinkedIn Insight Tag Page View
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);

// The tracking snippet is loaded automatically by the LinkedIn script tag`,
      },
      {
        id: "linkedin-conversion",
        name: "Conversion Tracking",
        description: "Track a LinkedIn conversion",
        code: `// LinkedIn Conversion Tracking
window.lintrk('track', { conversion_id: 12345 });`,
      },
    ],
  },
  {
    id: "twitter",
    name: "Twitter/X Pixel",
    guides: [
      {
        id: "twitter-pageview",
        name: "Page View",
        description: "Track when a user views a page",
        code: `// Twitter/X Pixel Page View
twq('track', 'PageView');`,
      },
      {
        id: "twitter-purchase",
        name: "Purchase",
        description: "Track when a user completes a purchase",
        code: `// Twitter/X Pixel Purchase Event
twq('track', 'Purchase', {
  value: '59.99',
  currency: 'USD',
  content_ids: ['SKU_12345'],
  content_name: 'Stan Smith Shoes',
  content_type: 'product'
});`,
      },
    ],
  },
];

// Function to copy text to clipboard
function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute top-3 right-3 h-8 w-8 p-0"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success("Code copied to clipboard!");
      }}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
      >
        <rect height="14" rx="2" ry="2" width="14" x="8" y="8"></rect>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
      </svg>
      <span className="sr-only">Copy Code</span>
    </Button>
  );
}

export default function TrackingLibraryPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Tracking Event Listener Library</h1>
          <p className="text-muted-foreground">
            Browse our library of tracking event listener implementations for various marketing platforms
          </p>
        </div>

        <Tabs defaultValue="google-analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
            {trackingCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {trackingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {category.guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{guide.name}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <pre className="p-4 rounded-md bg-muted overflow-x-auto">
                          <code className="text-sm">{guide.code}</code>
                        </pre>
                        <CopyButton text={guide.code} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}