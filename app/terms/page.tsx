import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TrackToMeasure",
  description: "TrackToMeasure's terms of service and usage agreement",
};

export default function TermsPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: April 26, 2025</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the TrackToMeasure website and services ("Service"), you agree 
            to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
            please do not use our Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Description of Service</h2>
          <p>
            TrackToMeasure provides tools for scanning websites for marketing tracking tags, 
            generating reports, and accessing implementation guides. We reserve the right to modify, 
            suspend, or discontinue the Service at any time without notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. User Accounts</h2>
          <p>
            You may need to create an account to use certain features of our Service. You are 
            responsible for maintaining the confidentiality of your account credentials and for 
            all activities that occur under your account. You agree to provide accurate and complete 
            information when creating an account and to update your information to keep it accurate and current.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. User Conduct</h2>
          <p>
            When using our Service, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Use the Service to scan websites without proper authorization</li>
            <li>Attempt to interfere with or disrupt the Service</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by 
            TrackToMeasure and are protected by international copyright, trademark, patent, 
            trade secret, and other intellectual property laws.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or 
            service without the prior written consent of TrackToMeasure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. User Content</h2>
          <p>
            By submitting, posting, or displaying content through the Service, you grant us a 
            non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, 
            publish, translate, and distribute such content in connection with providing the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall TrackToMeasure 
            be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible 
            losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">8. Disclaimers</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" 
            and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, 
            whether express or implied, including, but not limited to, implied warranties of 
            merchantability, fitness for a particular purpose, non-infringement or course of performance.
          </p>
          <p>
            TrackToMeasure does not warrant that: (a) the Service will function uninterrupted, 
            secure or available at any particular time or location; (b) any errors or defects 
            will be corrected; (c) the Service is free of viruses or other harmful components; 
            or (d) the results of using the Service will meet your requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">9. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of [Your Jurisdiction]. 
            TrackToMeasure and yourself irrevocably consent that the courts of [Your Jurisdiction] 
            shall have exclusive jurisdiction to resolve any dispute which may arise in connection 
            with these Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of 
            any changes by updating the "Last Updated" date at the top of these Terms. Your 
            continued use of the Service after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="pt-2">
            <p className="font-medium">TrackToMeasure</p>
            <p>123 Market St</p>
            <p>San Francisco, CA 94105</p>
            <p className="mt-2">Email: legal@tracktomeasure.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}