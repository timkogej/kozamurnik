import type { Metadata } from "next";

const BASE_URL = "https://kozamurnik.si";

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og/default.png",
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Kozamurnik Center mobilnosti`,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}
