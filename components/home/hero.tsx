import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Verify Your Marketing Tags in Seconds
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            TrackToMeasure helps marketers and freelancers audit and verify marketing tracking tags across websites.
            Generate comprehensive reports and access implementation guides.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild size="lg" className="px-8">
            <a href="#tag-scanner">Scan Website</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8">
            <Link href="/tracking-library">Browse Tracking Library</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="15" y1="12" y2="12" />
              </svg>
            </div>
            <h3 className="mt-2 font-semibold">Fast Scanning</h3>
            <p className="text-sm text-muted-foreground">Detect tags in seconds</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                className="h-6 w-6"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 17h6" />
                <path d="M12 6v11" />
              </svg>
            </div>
            <h3 className="mt-2 font-semibold">PDF Reports</h3>
            <p className="text-sm text-muted-foreground">Download & share easily</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                className="h-6 w-6"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <h3 className="mt-2 font-semibold">Event Listeners</h3>
            <p className="text-sm text-muted-foreground">Implementation guides</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
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
                className="h-6 w-6"
              >
                <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.85 1 4.9.346 1.05.206 1.15.5 2.15.293 1 2.531 2.95 5.3 4.7Z" />
                <path d="M19.8 17.8a7.5 7.5 0 0 0-2.4-3.8" />
                <path d="m14.7 9.5 2.8 3.7" />
              </svg>
            </div>
            <h3 className="mt-2 font-semibold">Multiple Tags</h3>
            <p className="text-sm text-muted-foreground">GA4, Meta, GTM & more</p>
          </div>
        </div>
      </div>
    </section>
  );
}