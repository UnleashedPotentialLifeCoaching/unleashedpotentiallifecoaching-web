import { GetServerSideProps } from 'next';
import { SITE_URL, SITE_NAVS } from 'utils/constants';
import { removeSlashFromSlug } from 'utils/helpers';

const Sitemap = () => null;
export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteLinks = SITE_NAVS.map(({ slug, children }) =>
    slug
      ? `
      <url>
        <loc>${SITE_URL}${removeSlashFromSlug(slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
  `
      : children?.map(
          ({ slug }) =>
            `
      <url>
        <loc>${SITE_URL}${removeSlashFromSlug(slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
      `
        )
  ).join(', ');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">      
      ${siteLinks} 
  </urlset>`;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=59'
  );
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
