"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ScanReportDownloadLink, type ScanResult as PDFScanResult, type TagResult as PDFTagResult } from "@/lib/services/pdf-generator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type TagStatus = "found" | "not_found" | "warning" | "loading";

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

// Initial tags for scanning
const initialTags: Tag[] = [
  { type: "gtm", name: "Google Tag Manager", status: "loading", id: null, warnings: [], icon: "/google-tag-manager.svg" },
  { type: "ga4", name: "Google Analytics 4", status: "loading", id: null, warnings: [], icon: "/google-analytics.svg" },
  { type: "meta", name: "Meta Pixel", status: "loading", id: null, warnings: [], icon: "/meta-pixel.svg" },
  { type: "ads", name: "Google Ads", status: "loading", id: null, warnings: [], icon: "/google-ads.svg" },
  { type: "microsoft", name: "Microsoft Advertising", status: "loading", id: null, warnings: [], icon: "/microsoft.svg" },
  { type: "linkedin", name: "LinkedIn Insight", status: "loading", id: null, warnings: [], icon: "/linkedin.svg" },
  { type: "twitter", name: "Twitter/X Pixel", status: "loading", id: null, warnings: [], icon: "/twitter.svg" },
  { type: "tiktok", name: "TikTok Pixel", status: "loading", id: null, warnings: [], icon: "/tiktok.svg" },
];

export default function ScannerPage() {
  const { data: session } = useSession();
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [urlError, setUrlError] = useState("");
  const [activeTab, setActiveTab] = useState("scan");

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    if (!url) {
      setUrlError("Please enter a URL");
      return;
    }

    if (!validateUrl(url)) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsScanning(true);
    setScanResult(null);

    try {
      // Call our API endpoint to scan the website
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scan website');
      }

      const scanData = await response.json();
      setScanResult(scanData);
      setActiveTab("results");
      toast.success("Website scan completed successfully!");
    } catch (error) {
      console.error("Scan failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to scan website. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  // Helper function to convert the ScanResult to PDFScanResult format
  const convertToPdfFormat = (scanResult: ScanResult): PDFScanResult => {
    const pdfTags: PDFTagResult[] = scanResult.tags.map(tag => ({
      type: tag.type,
      name: tag.name,
      status: tag.status === "loading" ? "not_found" : tag.status as "found" | "not_found" | "warning",
      id: tag.id,
      warnings: tag.warnings,
      icon: tag.icon
    }));

    return {
      url: scanResult.url,
      scanDate: scanResult.scanDate,
      cms: scanResult.cms,
      tags: pdfTags,
      recommendations: scanResult.recommendations
    };
  };

  return (
    <div className="container max-w-5xl px-4 py-12 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Website Tag Scanner</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analyze your website's marketing tags and tracking pixels to ensure proper implementation
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="scan">Scan Website</TabsTrigger>
          <TabsTrigger value="results" disabled={!scanResult}>Scan Results</TabsTrigger>
          <TabsTrigger value="history" disabled={!session}>Scan History</TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="mt-0">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Scan a Website</CardTitle>
              <CardDescription>
                Enter a website URL to detect marketing tags and tracking pixels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                      disabled={isScanning}
                    />
                    <Button type="submit" disabled={isScanning} className="min-w-[120px]">
                      {isScanning ? "Scanning..." : "Scan Now"}
                    </Button>
                  </div>
                  {urlError && <p className="text-sm text-red-500">{urlError}</p>}
                </div>
              </form>

              <div className="mt-10">
                <h3 className="text-lg font-medium mb-4">Tags We Detect</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {initialTags.map((tag) => (
                    <div key={tag.type} className="flex flex-col items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted mb-2">
                        {/* Icon placeholder */}
                        <span className="text-xl">{tag.type[0].toUpperCase()}</span>
                      </div>
                      <div className="text-sm font-medium text-center">{tag.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {isScanning && (
                <div className="mt-8 bg-muted/30 p-6 rounded-lg border border-dashed">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mr-3"></div>
                    <p className="text-lg font-medium">Scanning {url}...</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
                    {initialTags.map((tag) => (
                      <div key={tag.type} className="flex flex-col items-center p-3 border rounded-lg bg-background/50">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center">
                          <div className="animate-pulse w-5 h-5 bg-muted-foreground/30 rounded-full" />
                        </div>
                        <div className="mt-2 text-sm font-medium text-center">{tag.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">Checking...</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          {scanResult && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Scan Results</span>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("scan")}>
                    New Scan
                  </Button>
                </CardTitle>
                <CardDescription>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                    <Badge variant="outline" className="w-fit">URL: {scanResult.url}</Badge>
                    <Badge variant="outline" className="w-fit">Scan Date: {new Date(scanResult.scanDate).toLocaleString()}</Badge>
                    {scanResult.cms && <Badge variant="outline" className="w-fit">CMS: {scanResult.cms}</Badge>}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Detected Tags</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {scanResult.tags.map((tag) => (
                        <div 
                          key={tag.type} 
                          className={`flex flex-col items-center p-4 border-2 rounded-lg ${
                            tag.status === "found" 
                              ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900" 
                              : tag.status === "warning"
                              ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900"
                              : "border-muted"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2">
                            {tag.status === "found" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-green-500"
                              >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                <path d="m9 12 2 2 4-4" />
                              </svg>
                            ) : tag.status === "warning" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-amber-500"
                              >
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-muted-foreground"
                              >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                <path d="M15 9l-6 6" />
                                <path d="M9 9l6 6" />
                              </svg>
                            )}
                          </div>
                          <div className="font-medium text-center">{tag.name}</div>
                          <div className="text-xs text-center mt-1">
                            {tag.status === "found" ? (
                              tag.id ? (
                                <span className="text-green-600 dark:text-green-400">ID: {tag.id}</span>
                              ) : (
                                <span className="text-green-600 dark:text-green-400">Detected</span>
                              )
                            ) : tag.status === "warning" ? (
                              <span className="text-amber-600 dark:text-amber-400">Warning</span>
                            ) : (
                              <span className="text-muted-foreground">Not found</span>
                            )}
                          </div>
                          {tag.warnings.length > 0 && (
                            <div className="mt-2 text-xs text-amber-600 text-center">
                              ⚠️ {tag.warnings[0]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {scanResult.recommendations.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                      <div className="bg-muted/30 rounded-lg p-4 border border-dashed">
                        <ul className="list-disc pl-5 space-y-2">
                          {scanResult.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                {session ? (
                  <ScanReportDownloadLink 
                    scanResult={convertToPdfFormat(scanResult)} 
                    fileName={`tracking-report-${new Date().toISOString().split('T')[0]}.pdf`}
                    className="sm:flex-1"
                  >
                    {({ loading }) => (
                      <Button className="w-full">
                        {loading ? "Generating PDF..." : "Download PDF Report"}
                      </Button>
                    )}
                  </ScanReportDownloadLink>
                ) : (
                  <Button 
                    onClick={() => toast.info("To download reports, please create an account or log in.")} 
                    className="w-full sm:flex-1"
                  >
                    Generate PDF Report
                  </Button>
                )}
                <Button variant="outline" onClick={() => setActiveTab("scan")} className="w-full sm:w-auto">
                  Scan Another Website
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>
                {session ? "View your previous website scans" : "Please log in to view your scan history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!session ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">You need to be logged in to see your scan history</p>
                  <Button 
                    onClick={() => window.location.href = "/login"} 
                    variant="outline"
                  >
                    Log In
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">Your scan history will appear here</p>
                // In a real implementation, we'd fetch and display the user's scan history
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}