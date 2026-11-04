import { redirect } from "next/navigation";

// "Industries" is a nav dropdown, not a page. Forward manual visits to its first item.
export default function IndustriesIndexPage() {
  redirect("/industries/construction/");
}
