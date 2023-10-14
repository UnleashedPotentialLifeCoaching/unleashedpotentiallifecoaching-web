import SiteHead from 'components/shared/SiteHead';
import Container from 'layouts/Container';
import FadeInContainer from 'layouts/FadeInContainer';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { urlify } from 'utils/helpers';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { format } from 'date-fns';
import { IBlogPostFields, IReviewFields } from 'types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ConstantsContext } from 'contexts/ConstantsContext';

interface Props {
  post: IBlogPostFields;
  postContent: any;
}

const PostPage = ({ post, postContent }: Props) => {
  const router = useRouter();
  const { seo_defaults } = useContext(ConstantsContext);
  return (
    <FadeInContainer>
      <SiteHead
        title={post?.seoTitle || seo_defaults.title}
        metaDescription={
          post?.seoMetaDescription || seo_defaults.metaDescription
        }
      />
      <main>
        <Container>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="w-full sm:w-2/3">
              <h1 className="mb-4 text-3xl text-forrest sm:text-5xl md:text-6xl">
                {post?.postTItle}
              </h1>
              <div className="flex flex-row w-full mb-4 text-stone-600">
                <p>
                  <span className="mr-1 font-bold leading-snug text-stone-400">
                    Date:{' '}
                  </span>
                  <span className="mr-3 text-base text-stone-500">
                    {format(
                      new Date(post?.publishDate as string),
                      'LLLL M, yyyy',
                    )}
                  </span>
                  <span className="mr-1 font-bold leading-snug text-stone-400">
                    Author:
                  </span>
                  <span className="text-base text-stone-500">
                    {post?.author?.name}
                  </span>
                </p>
              </div>
              {router.asPath.includes(
                'work-with-victims-of-domestic-violence',
              ) ? (
                <>
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      paddingTop: '150.25%',
                    }}
                  >
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      src="/MyWorkwithVictimsofDomesticViolence.pdf#toolbar=0"
                    ></iframe>
                  </div>
                </>
              ) : (
                <>
                  {post?.featuredImage && (
                    <Image
                      src={post?.featuredImage?.url}
                      alt={post?.postTItle as string}
                      width={post?.featuredImage?.width}
                      height={post?.featuredImage?.height}
                      layout="intrinsic"
                    />
                  )}

                  <div className="blog-post-content">
                    {documentToReactComponents(postContent?.json)}
                  </div>
                </>
              )}
            </div>
            <div className="w-full sm:w-1/3 sm:px-12">
              <div className="flex flex-col w-full pb-3 mb-4 border-b-2">
                <Link
                  href={`/coach/${urlify(post?.author?.name[0]?.text || '')}`}
                  passHref
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={post?.author?.profileImage?.url}
                      alt={post?.author?.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <p className="mt-3 text-gray-600">
                    <strong className="block">Meet our coach</strong>{' '}
                    {post?.author?.name}
                  </p>
                </Link>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <p className="text-sm font-bold text-center">Follow us</p>
                <div className="flex flex-row items-center justify-center my-3">
                  <a
                    href="https://www.facebook.com/unleashedpotentiallifecoaching/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineFacebook size={36} className="text-forrest" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/unleashedpotentiallifecoaching/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AiOutlineInstagram size={36} className="text-forrest" />
                    <span className="sr-only">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </FadeInContainer>
  );
};
export default PostPage;
