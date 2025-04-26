import Hero from "@/components/home/hero";
import TagScanner from "@/components/home/tag-scanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-10">
      <Hero />
      <TagScanner />
    </div>
  );
}
