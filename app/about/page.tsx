import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | TrackToMeasure",
  description: "Learn about TrackToMeasure and our mission to simplify tag management",
};

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">About TrackToMeasure</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Simplifying marketing tag auditing and implementation for digital marketers and developers.
        </p>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p>
            TrackToMeasure was created to solve a common challenge faced by marketers and web developers: 
            verifying that marketing tracking tags are correctly implemented on websites. Our tool streamlines 
            this process by providing a single platform to scan, audit, and generate reports on marketing tags.
          </p>
          <p>
            We believe that accurate tracking is the foundation of effective digital marketing, and our goal is 
            to make this technical task accessible to everyone, regardless of their technical expertise.
          </p>
        </section>
        
        <section className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Tag Scanning</h3>
              <p className="text-muted-foreground">
                Our powerful scanner detects multiple marketing tracking tags from a single URL input, 
                giving you instant visibility into your tracking implementation.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">PDF Reports</h3>
              <p className="text-muted-foreground">
                Generate comprehensive, professional reports that can be shared with clients 
                or team members to document your tracking setup.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Tracking Library</h3>
              <p className="text-muted-foreground">
                Access our extensive library of tracking event listener implementation guides 
                to ensure proper tag configuration across multiple platforms.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Recommendations</h3>
              <p className="text-muted-foreground">
                Receive smart recommendations based on scan results to improve your 
                tracking implementation and marketing effectiveness.
              </p>
            </div>
          </div>
        </section>
        
        <section className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Who We Serve</h2>
          <p>
            TrackToMeasure is designed for digital marketing professionals, web developers, 
            marketing consultants, and in-house marketing teams who need to verify and maintain 
            tracking implementations across websites.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Digital marketing agencies managing multiple client websites</li>
            <li>Marketing consultants and freelancers providing technical audits</li>
            <li>Web developers implementing tracking for marketing teams</li>
            <li>In-house marketing teams maintaining their tracking infrastructure</li>
            <li>SEO specialists analyzing website performance and conversions</li>
          </ul>
        </section>
      </div>
    </div>
  );
}