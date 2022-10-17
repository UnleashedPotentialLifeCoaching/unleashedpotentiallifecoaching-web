import { GetServerSideProps } from 'next';
import { IBlogPostFields } from 'types/contentful';
import { fetchAPI } from 'utils/api';
import { SITE_URL, SITE_NAVS } from 'utils/constants';
import { removeSlashFromSlug } from 'utils/helpers';

const blogPostsQuery = `
query blogPostCollectionQuery {
  blogPostCollection {
    items {
      postTItle
      publishDate
      slugText
      subTitle
      author {
        ...on Coach {
          name
          profileImage {
            url
            width
            height
          }
        }
      }
      featuredImage {
        url
        width
        height
      }
    }
  }
}`;

const Sitemap = () => null;
export default Sitemap;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { res } = context;
  const blogPostsData = await fetchAPI(blogPostsQuery, {});
  const posts = blogPostsData?.data?.blogPostCollection
    ?.items as IBlogPostFields[];

  const postLinks = posts
    .map((post: IBlogPostFields) => {
      return `
      <url>
        <loc>${SITE_URL}/post/${post?.slugText}</loc>
        <lastmod>${new Date(
          post?.publishDate as string
        ).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url> 

    `;
    })
    .join(', ');

  const siteLinks = SITE_NAVS.filter(
    (link) => link?.slug !== 'https:/themendwellness.com/'
  )
    .map(({ slug, children }) =>
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
    )
    .join(', ');

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
