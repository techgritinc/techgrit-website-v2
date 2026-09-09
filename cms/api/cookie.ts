import { fetchCms } from "./fetcher";
import type { CookieBannerData, CookieOption, StrapiCookieOption, StrapiCookieData } from "../types/cookie-types";

const COOKIE_ENDPOINT = "/api/cookie?populate[DeclineOptions][populate][Options]=true";

function toCookieOption(option: StrapiCookieOption): CookieOption {
  const name = option.name.toLowerCase();
  const preferenceKey: CookieOption["preferenceKey"] = name.includes("marketing")
    ? "marketing"
    : name.includes("functional")
      ? "functional"
      : name.includes("analytics")
        ? "analytics"
        : null;

  return {
    id: option.id,
    title: option.name,
    description: option.description,
    locked: option.isEnabledByDefault === true,
    defaultChecked: option.isEnabledByDefault === true,
    preferenceKey,
  };
}

// Called from the CookieBanner Server Component (await getCookieBannerData()) — runs
// on the server per request, same as header/footer. No fallback data: if the CMS is
// unreachable or the settings panel/options aren't configured, this returns null and
// the banner renders nothing rather than substituting hardcoded copy.
export async function getCookieBannerData(): Promise<CookieBannerData | null> {
  const data = await fetchCms<StrapiCookieData>(COOKIE_ENDPOINT);
  const panel = data?.DeclineOptions?.[0];
  if (!data || !panel || panel.Options.length === 0) return null;

  return {
    message: data.title,
    acceptLabel: data.acceptLabel,
    declineLabel: data.declineLabel,
    settingsTitle: panel.title,
    saveLabel: panel.ctaLabel,
    options: panel.Options.map(toCookieOption),
  };
}
