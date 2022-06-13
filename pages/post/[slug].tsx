import React from 'react';
import {Post} from 'types/Post';
import { blogPostQuery } from 'utils/api';


const Post = ({ post }: Post) => {
  console.log({ post })
  return (
    <div>
      Well get there.
    </div>
  )
};

export const getServerSideProps = async ({ params }) => {
  const request = await blogPostQuery(params?.slug);

  return {
    props: {
      post: request
    } 
  }
}

export default Post;
