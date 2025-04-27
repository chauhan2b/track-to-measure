import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-4 py-16 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 - Page Not Found</h1>
        <p className="max-w-[600px] text-muted-foreground mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
      
      <div className="mt-8 text-muted-foreground space-y-4">
        <p>Looking for something specific? You might find it here:</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <Link href="/tracking-library" className="text-primary hover:underline">Tracking Library</Link>
          <Link href="/about" className="text-primary hover:underline">About Us</Link>
          <Link href="/contact" className="text-primary hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  );
}