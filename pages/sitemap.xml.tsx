import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IBlogPostFields } from 'types/contentful';
import { fetchContenfulAPI } from 'utils/api';
import { SITE_URL, CACHE_CONTROL, CACHE_LIFE } from 'utils/constants';
import { removeSlashFromSlug, siteConstants } from 'utils/helpers';
import { allBlogPostsQuery } from 'utils/queries';

const Sitemap = () => null;
export default Sitemap;

const generateXML = (slug: string, date: string, isPost: boolean) => {
  const url = `${SITE_URL}${isPost ? 'post/' : ''}${slug}`;
  return `
  <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 
    `;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { res } = context;
  const blogPostsData = await fetchContenfulAPI(allBlogPostsQuery, {});
  const posts = blogPostsData?.data?.blogPostCollection
    ?.items as IBlogPostFields[];
  const constants = siteConstants;

  const postLinks = posts
    .filter((post: IBlogPostFields) => post?.slugText !== null)
    .map((post: IBlogPostFields) =>
      generateXML(
        post?.slugText as string,
        new Date(post?.publishDate as string).toISOString(),
        true,
      ),
    )
    .join('');

  const siteLinks = constants?.site_navigation
    .map((nav) => {
      // nav can be:
      // { id: number; slug: string; label: string; children?: undefined }
      // or { id: number; slug: null; label: string; children: [...] }
      if (nav && typeof nav.slug === 'string' && nav.slug) {
        return generateXML(
          removeSlashFromSlug(nav.slug),
          new Date().toISOString(),
          false,
        );
      }

      if (nav?.children) {
        return nav?.children
          .filter(
            (link: { slug: string | string[] }) =>
              !link?.slug?.includes('themendwellness'),
          )
          .map((nav: { slug: string }) => {
            return generateXML(
              removeSlashFromSlug(nav?.slug),
              new Date().toISOString(),
              false,
            );
          })
          .join('');
      }
    })
    .join('');

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
