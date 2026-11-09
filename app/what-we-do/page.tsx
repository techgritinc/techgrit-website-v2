import { redirect } from "next/navigation";

// "What We Do" is a nav dropdown, not a page. Forward manual visits to its first item.
export default function WhatWeDoIndexPage() {
  redirect("/what-we-do/ai-modernization/");
}
