import type { GetServerSideProps } from "next";
import { rasterBrosProjects } from "../shared/projects-data";
import { SITE_URL } from "@/lib/seo";

function generateSiteMap() {
  const staticRoutes = ["", "/careers", "/join-internship"];
  const projectRoutes = rasterBrosProjects.map((project) => `/project/${project.slug}`);
  const urls = [...staticRoutes, ...projectRoutes];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${SITE_URL}${url}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;
}

export default function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(generateSiteMap());
  res.end();

  return { props: {} };
};
