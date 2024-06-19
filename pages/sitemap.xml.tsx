import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IBlogPostFields } from 'types/contentful';
import { fetchContenfulAPI } from 'utils/api';
import { SITE_URL, CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';
import { removeSlashFromSlug } from 'utils/helpers';
import { allBlogPostsQuery } from 'utils/queries';
import { siteConstants } from './api/site-constants';

const Sitemap = () => null;
export default Sitemap;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { res } = context;
  const blogPostsData = await fetchContenfulAPI(allBlogPostsQuery, {});
  const posts = blogPostsData?.data?.blogPostCollection
    ?.items as IBlogPostFields[];
  const constants = await siteConstants();

  const postLinks = posts
    .map((post: IBlogPostFields) => {
      return `
      <url>
        <loc>${SITE_URL}/post${post?.slugText}</loc>
        <lastmod>${new Date(
          post?.publishDate as string,
        ).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 

    `;
    })
    .join(',');

  const siteLinks = constants?.site_navigation
    .map(
      ({
        slug,
        children,
      }: {
        slug: string;
        children: {
          slug: string;
        }[];
      }) =>
        slug
          ? `
      <url>
        <loc>${SITE_URL}${removeSlashFromSlug(slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
  `
          : children
              ?.filter((link) => !link?.slug?.includes('themendwellness'))
              .map(
                ({ slug }) =>
                  `
      <url>
        <loc>${SITE_URL}${removeSlashFromSlug(slug)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
      `,
              ),
    )
    .join(',');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">      
      ${siteLinks}
      ${postLinks}
  </urlset>`;

  res.setHeader(CACHE_CONTROL, CACHE_LIFE);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
