import { redirect } from "next/navigation";

// "About" is a nav dropdown, not a page. Forward manual visits to its first item.
export default function AboutIndexPage() {
  redirect("/about/our-story/");
}
