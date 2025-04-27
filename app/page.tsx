import Hero from "@/components/home/hero";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-10">
      <Hero />
      
      <section id="tag-scanner-promo" className="container px-4 md:px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Website Tag Scanner</CardTitle>
              <CardDescription>
                Analyze your website's marketing tags and tracking pixels to ensure proper implementation
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="grid grid-cols-4 gap-3 mb-6 w-full">
                {['Google Tag Manager', 'Meta Pixel', 'Google Analytics', 'LinkedIn'].map((tag) => (
                  <div key={tag} className="flex flex-col items-center p-2 border rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center mb-2">
                      <span className="text-xl font-bold">{tag.charAt(0)}</span>
                    </div>
                    <div className="text-xs text-center font-medium">{tag}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Our powerful scanner detects marketing and analytics tags on your website 
                and provides a detailed report with recommendations.
              </p>
              <Link href="/scanner" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Try Tag Scanner
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
