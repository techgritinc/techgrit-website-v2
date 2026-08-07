export default function githubPagesLoader({ src }: { src: string; width: number; quality?: number }) {
  const basePath = "/techgrit-website-v2";
  return src.startsWith("/") ? `${basePath}${src}` : src;
}
