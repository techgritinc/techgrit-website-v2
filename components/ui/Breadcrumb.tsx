import Link from "next/link";

export interface BreadcrumbProps {
  ancestorLabel: string;
  ancestorHref: string;
  currentLabel: string;
}


export default function Breadcrumb({ ancestorLabel, ancestorHref, currentLabel }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-2xs leading-[normal] font-bold tracking-08 uppercase text-55">
        <li>
          <Link href={ancestorHref} className="transition-colors duration-200 hover:text-white">
            {ancestorLabel}
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-40">
          /
        </li>
        <li aria-current="page" className="text-white">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
