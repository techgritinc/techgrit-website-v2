import { redirect } from "next/navigation";

// "How We Work" is a nav dropdown, not a page. Forward manual visits to its first item.
export default function HowWeWorkIndexPage() {
  redirect("/how-we-work/orbit-ai-ecosystem/");
}
