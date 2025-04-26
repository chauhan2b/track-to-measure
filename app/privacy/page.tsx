import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TrackToMeasure",
  description: "TrackToMeasure's privacy policy and data handling practices",
};

export default function PrivacyPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: April 26, 2025</p>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Introduction</h2>
          <p>
            TrackToMeasure ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you use our website and services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using TrackToMeasure, 
            you acknowledge that you have read, understood, and agree to be bound by the terms 
            described in this policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Account Information</h3>
            <p>
              When you create an account, we collect your name, email address, and password. 
              This information is used to identify you, authenticate your account, and provide access to our services.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Website Scanning Data</h3>
            <p>
              When you scan a website using our tools, we collect the URL and metadata related to 
              the marketing tracking tags detected on that website. This information is used to 
              generate reports and provide our core services.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Usage Information</h3>
            <p>
              We collect information about how you use our services, including features accessed, 
              time spent on pages, actions taken, and other related metrics. This helps us improve 
              our service and user experience.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide, maintain, and improve our services</li>
            <li>To process and fulfill your requests such as generating reports</li>
            <li>To send you technical notices, updates, and administrative messages</li>
            <li>To respond to your comments, questions, and customer service requests</li>
            <li>To monitor and analyze trends, usage, and activities in connection with our services</li>
            <li>To detect, prevent, and address technical issues and fraudulent activities</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information in the 
            following situations:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            <li>With your consent or at your direction</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures designed to protect 
            the security of any personal information we process. However, please note that no 
            method of transmission over the internet or electronic storage is 100% secure, 
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal 
            information, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Right to access the personal information we hold about you</li>
            <li>Right to rectify inaccurate personal information</li>
            <li>Right to delete your personal information</li>
            <li>Right to restrict or object to our processing of your personal information</li>
            <li>Right to data portability</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="pt-2">
            <p className="font-medium">TrackToMeasure</p>
            <p>123 Market St</p>
            <p>San Francisco, CA 94105</p>
            <p className="mt-2">Email: privacy@tracktomeasure.com</p>
          </div>
        </section>
      </div>
    </div>
  );
}