import { getCookieBannerData } from "@/cms/api/cookie";
import CookieBannerClient from "./CookieBannerClient";

export default async function CookieBanner() {
  const data = await getCookieBannerData();
  if (!data) return null;
  return <CookieBannerClient data={data} />;
}
