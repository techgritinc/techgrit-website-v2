import { redirect } from "next/navigation";

// "Insights" is a nav dropdown, not a page. Forward manual visits to its first item.
export default function InsightsIndexPage() {
  redirect("/insights/case-studies/");
}
