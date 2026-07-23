import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/ui/footer";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full relative z-10 pt-24 min-h-screen">
      <Contact />
      <Footer />
    </main>
  );
}
