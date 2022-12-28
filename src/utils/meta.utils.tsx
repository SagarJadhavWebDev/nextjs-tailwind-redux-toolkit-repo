import imageConstants from "@/constants/imageConstants";
import siteConstants from "@/constants/siteConstants";
import { unionBy } from "lodash";
import Head from "next/head";

export type MetaNameType =
  | "viewport"
  | "og:site_name"
  | "og:locale"
  | "og:type"
  | "og:title"
  | "og:description"
  | "og:image"
  | "og:theme-color"
  | "og:post_id";

export interface SiteMetaType {
  name: string;
  content: string;
}
export const baseMeta: SiteMetaType[] = [
  { name: "viewport", content: "initial-scale=1.0, width=device-width" },
  { name: "og:site_name", content: "E-sign by squidsoft" },
  { name: "og:locale", content: "en_US" },
  { name: "og:type", content: "website" },
  {
    name: "og:image",
    content: imageConstants.logo,
  },
  {
    name: "og:description",
    content: siteConstants.META_DESCRIPTION,
  },
  {
    name: "og:theme-color",
    content: "#ffffff",
  },
];

// interface SiteMeta {
//   title: string;
//   subtitle: string;
//   mediaUrl: string;
// }
export function generateMeta(meta?: SiteMetaType[]) {
  return unionBy(meta || [], baseMeta, "name").map((meta, idx) => (
    <meta key={idx} {...meta} />
  ));
}

export interface SEOProps {
  title?: string;
  meta?: SiteMetaType[];
}
export const SEO: React.FC<SEOProps> = ({ title, meta }) => {
  return (
    <Head>
      <title>{title}</title>
      {generateMeta(meta)}
    </Head>
  );
};
