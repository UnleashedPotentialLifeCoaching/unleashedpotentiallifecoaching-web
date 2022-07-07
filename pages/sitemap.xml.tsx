import { GetServerSideProps } from 'next';
import { SITE_URL, SITE_NAVS } from 'utils/constants';
import { removeSlashFromSlug } from 'utils/helpers';
import { allBlogsQuery } from 'utils/api';

const Sitemap = () => null;
export default Sitemap;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const fetchPosts = await allBlogsQuery();
  const postLinks = fetchPosts
    .map(({ node }) => {
      return `
      <url>
        <loc>${SITE_URL}/post/${node?.slug_text}</loc>
        <lastmod>${new Date(node?.publish_date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 

    `;
    })
    .join(', ');

  const siteLinks = SITE_NAVS.map(({ slug, children }) =>
    slug
      ? `
      <url>
        <loc>${SITE_URL}/${removeSlashFromSlug(slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
  `
      : children?.map(
          ({ slug }) =>
            `
      <url>
        <loc>${SITE_URL}/${removeSlashFromSlug(slug)}</loc>
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
      ${postLinks}
  </urlset>`;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=864000, stale-while-revalidate=59'
  );
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
