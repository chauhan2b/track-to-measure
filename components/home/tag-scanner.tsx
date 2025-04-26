"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ScanReportDownloadLink, type ScanResult as PDFScanResult, type TagResult as PDFTagResult } from "@/lib/services/pdf-generator";

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

// Mock initial data for demo purposes
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

export default function TagScanner() {
  const { data: session } = useSession();
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [urlError, setUrlError] = useState("");

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
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate a successful scan with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock data for demonstration
      const mockResult: ScanResult = {
        url,
        scanDate: new Date().toISOString(),
        cms: "WordPress",
        tags: [
          { type: "gtm", name: "Google Tag Manager", status: "found", id: "GTM-ABCD123", warnings: [], icon: "/google-tag-manager.svg" },
          { type: "ga4", name: "Google Analytics 4", status: "found", id: "G-ABCD1234", warnings: ["Incomplete configuration"], icon: "/google-analytics.svg" },
          { type: "meta", name: "Meta Pixel", status: "found", id: "123456789012345", warnings: [], icon: "/meta-pixel.svg" },
          { type: "ads", name: "Google Ads", status: "not_found", id: null, warnings: [], icon: "/google-ads.svg" },
          { type: "microsoft", name: "Microsoft Advertising", status: "not_found", id: null, warnings: [], icon: "/microsoft.svg" },
          { type: "linkedin", name: "LinkedIn Insight", status: "not_found", id: null, warnings: [], icon: "/linkedin.svg" },
          { type: "twitter", name: "Twitter/X Pixel", status: "found", id: "tw-abcd1234", warnings: [], icon: "/twitter.svg" },
          { type: "tiktok", name: "TikTok Pixel", status: "not_found", id: null, warnings: [], icon: "/tiktok.svg" },
        ],
        recommendations: [
          "Consider implementing Google Ads tag for conversion tracking",
          "Fix Google Analytics 4 configuration",
          "Add Microsoft Advertising tag for better campaign tracking"
        ]
      };

      setScanResult(mockResult);
      toast.success("Website scan completed successfully!");
    } catch (error) {
      console.error("Scan failed:", error);
      toast.error("Failed to scan website. Please try again.");
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
    <section id="tag-scanner" className="container px-4 md:px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Website Tag Scanner</CardTitle>
            <CardDescription>
              Enter a URL to scan for marketing tracking tags and generate a report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleScan} className="space-y-4">
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isScanning}>
                    {isScanning ? "Scanning..." : "Scan"}
                  </Button>
                </div>
                {urlError && <p className="text-sm text-red-500">{urlError}</p>}
              </div>
            </form>

            {isScanning && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Scanning website...</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {initialTags.map((tag) => (
                    <div key={tag.type} className="flex flex-col items-center p-2 border rounded-lg">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <div className="animate-pulse w-5 h-5 bg-muted-foreground/20 rounded-full" />
                      </div>
                      <div className="mt-2 text-sm font-medium text-center">{tag.name}</div>
                      <div className="text-xs text-muted-foreground">Checking...</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scanResult && (
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Scan Results</h3>
                  <p className="text-sm text-muted-foreground">
                    URL: {scanResult.url} • 
                    Scanned on: {new Date(scanResult.scanDate).toLocaleString()} •
                    CMS: {scanResult.cms || "Unknown"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {scanResult.tags.map((tag) => (
                    <div 
                      key={tag.type} 
                      className={`flex flex-col items-center p-3 border rounded-lg ${
                        tag.status === "found" 
                          ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900" 
                          : "border-muted"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center">
                        {/* Replace with actual favicons in a real implementation */}
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
                      <div className="mt-2 text-sm font-medium text-center">{tag.name}</div>
                      <div className="text-xs text-center">
                        {tag.status === "found" ? (
                          tag.id ? (
                            <span className="text-green-600 dark:text-green-400">{tag.id}</span>
                          ) : (
                            <span className="text-green-600 dark:text-green-400">Detected</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">Not found</span>
                        )}
                      </div>
                      {tag.warnings.length > 0 && (
                        <div className="mt-1 text-xs text-amber-600 text-center">
                          ⚠️ {tag.warnings[0]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {scanResult.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium">Recommendations</h3>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {scanResult.recommendations.map((rec, i) => (
                        <li key={i} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {scanResult && (
            <CardFooter>
              {session ? (
                <ScanReportDownloadLink 
                  scanResult={convertToPdfFormat(scanResult)} 
                  fileName={`tracking-report-${new Date().toISOString().split('T')[0]}.pdf`}
                >
                  {({ loading }) => (
                    <Button className="w-full">
                      {loading ? "Generating PDF..." : "Download PDF Report"}
                    </Button>
                  )}
                </ScanReportDownloadLink>
              ) : (
                <Button onClick={() => toast.info("To download reports, please create an account or log in.", {
                  action: {
                    label: "Sign Up",
                    onClick: () => window.location.href = "/register"
                  }
                })} className="w-full">
                  Generate PDF Report
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}